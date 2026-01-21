"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/bootstrap.css"
import * as z from "zod"
import CryptoJS from "crypto-js"
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react"
import { crearRegistro } from "@/lib/registro-peticion-actions"
import { usePushNotifications } from "@/app/hooks/usePushNotifications"

// --------- CIFRADO LOCAL (solo para LocalStorage) ----------
const SECRET_KEY = "monte-sion-peticion"
const STORAGE_KEY = "peticion_oracion_secure"

// --------- ESQUEMA ----------
const schema = z.object({
  nombre: z.string().optional(),
  email: z.string().email("Correo inválido").optional(),
  telefono: z.string().min(10, "Teléfono inválido").optional(),
  peticion: z.string().min(1, "Escribe tu petición de oración"),
  anonimo: z.boolean(),
}).superRefine((data, ctx) => {
  if (!data.anonimo) {
    if (!data.nombre) ctx.addIssue({ path: ["nombre"], message: "Nombre requerido", code: "custom" })
  }
})

type FormValues = z.infer<typeof schema>

// --------- UTILIDADES RSA + AES (E2EE) ----------
function pemToArrayBuffer(pem?: string) {
  if (!pem) {
    throw new Error("Clave pública RSA no encontrada en NEXT_PUBLIC_RSA_PUBLIC_KEY")
  }

  const b64 = pem.replace(/-----.*?-----/g, "").replace(/\s+/g, "")
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

function bufferToHex(buffer: Uint8Array) {
  return Array.from(buffer).map(b => b.toString(16).padStart(2, "0")).join("")
}

async function encryptE2EE(text: string) {
  const enc = new TextEncoder()

  // 1. Importar clave pública RSA
  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    pemToArrayBuffer(process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  )

  // 2. Generar clave AES cruda
  const aesKeyRaw = window.crypto.getRandomValues(new Uint8Array(32)) // 256 bits
  const iv = window.crypto.getRandomValues(new Uint8Array(12))

  const aesKey = await window.crypto.subtle.importKey(
    "raw",
    aesKeyRaw,
    "AES-GCM",
    false,
    ["encrypt"]
  )

  // 3. Cifrar texto con AES-GCM
  const cipherBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    enc.encode(text)
  )

  // 4. Cifrar la clave AES con RSA-OAEP
  const encryptedAesKey = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    aesKeyRaw
  )

  return {
    peticion_cipher: bufferToHex(new Uint8Array(cipherBuffer)),
    peticion_iv: bufferToHex(iv),
    peticion_key_rsa: bufferToHex(new Uint8Array(encryptedAesKey)),
  }
}

// --------- UI ----------
const commonInputClasses =
  "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-zinc-400/60 focus:outline-none"

export default function RegistroPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<null | { type: "success" | "error"; text: string }>(null)
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  usePushNotifications("admin")

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { anonimo: false, peticion: "" },
    shouldUnregister: true,
  })

  const anonimo = watch("anonimo")

  const toggleEmail = () => {
    setShowEmail((prev) => {
      const next = !prev
      if (!next) {
        setValue("email", undefined)
        clearErrors("email")
      }
      return next
    })
  }

  const togglePhone = () => {
    setShowPhone((prev) => {
      const next = !prev
      if (!next) {
        setValue("telefono", undefined)
        clearErrors("telefono")
      }
      return next
    })
  }

  // 🔐 Restaurar progreso cifrado
  useEffect(() => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEY)
      if (encrypted) {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        reset(data)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [reset])

  // 💾 Guardar progreso cifrado
  useEffect(() => {
    const sub = watch((data) => {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
      localStorage.setItem(STORAGE_KEY, encrypted)
    })
    return () => sub.unsubscribe()
  }, [watch])

  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
    reset({ anonimo: false, peticion: "" })
    setShowEmail(false)
    setShowPhone(false)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      setMessage(null)

      // 🔐 Cifrar petición en el navegador (E2EE)
      const e2ee = await encryptE2EE(data.peticion)

      const payload = {
        ...data,
        ...e2ee,      // texto ya cifrado
        peticion: "", // nunca se envía en claro
        nombre: data.nombre ?? "",
        email: data.email ?? "",
        telefono: data.telefono ?? "",
      }

  const res = await crearRegistro(payload)
  console.log("RESPUESTA SERVER:", res)
  if (!res?.ok) throw new Error(res?.debug || "Error desconocido")

      clearProgress()

      setMessage({
        type: "success",
        text: "¡Hemos recibido tu petición! Estamos orando por ti. Proverbios 3:5-6",
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Ocurrió un error al enviar."
      setMessage({
        type: "error",
        text: message,
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center font-bold text-xl">
          Petición de oración · Monte Sion
        </h1>

        {message && (
          <div className={`p-4 rounded text-sm ${
            message.type === "success"
              ? "bg-green-200 text-green-900"
              : "bg-red-200 text-red-900"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 rounded-2xl">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("anonimo")} />
            Enviar de forma anónima
          </label>

          {!anonimo && (
            <>
              <div>
                <div className="flex items-center gap-3">
                  <User size={20} className="text-zinc-500" />
                  <input
                    {...register("nombre")}
                    placeholder="Nombre"
                    className={commonInputClasses}
                  />
                </div>
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
              </div>
            </>
          )}

          <div>
            <div className="flex items-start gap-3">
              <MessageSquare size={20} className="text-zinc-500 mt-3" />
              <textarea
                {...register("peticion")}
                placeholder="Escribe tu petición de oración"
                rows={4}
                className={`${commonInputClasses} resize-none`}
              />
            </div>
            {errors.peticion && <p className="text-red-500 text-xs mt-1">{errors.peticion.message}</p>}
          </div>

          {!anonimo && (
            <div className="space-y-3">
              <div className="text-xs text-zinc-500">
                Agrega un medio de contacto (Opcional)
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={toggleEmail}
                  className={`h-12 rounded-xl border transition flex items-center justify-center gap-2 ${
                    showEmail
                      ? "border-zinc-400/70 bg-zinc-100 text-zinc-700 dark:border-white/30 dark:bg-white/10 dark:text-white"
                      : "border-zinc-200 text-zinc-500 hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10"
                  }`}
                >
                  <Mail size={18} />
                  Correo
                </button>

                <button
                  type="button"
                  onClick={togglePhone}
                  className={`h-12 rounded-xl border transition flex items-center justify-center gap-2 ${
                    showPhone
                      ? "border-zinc-400/70 bg-zinc-100 text-zinc-700 dark:border-white/30 dark:bg-white/10 dark:text-white"
                      : "border-zinc-200 text-zinc-500 hover:bg-zinc-100 dark:border-white/20 dark:hover:bg-white/10"
                  }`}
                >
                  <Phone size={18} />
                  Teléfono
                </button>
              </div>

              {showEmail && (
                <div>
                  <input
                    {...register("email")}
                    placeholder="tu@correo.com"
                    className={commonInputClasses}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              )}

              {showPhone && (
                <div>
                  <Controller
                    name="telefono"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        country="mx"
                        value={field.value || ""}
                        onChange={field.onChange}
                        inputClass="!w-full !h-12 !rounded-xl !border-zinc-200 dark:!border-white/20 !focus:ring-0 !focus:outline-none !shadow-none"
                      />
                    )}
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Enviando…
              </>
            ) : (
              <>
                <Send size={18} />
                {anonimo ? "Enviar anónimamente" : "Enviar petición"}
              </>
            )}
          </button>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearProgress}
              className="text-xs text-zinc-500 hover:text-zinc-700 underline"
            >
              Borrar progreso
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}