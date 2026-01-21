"use client"

import { registerAction } from "@/lib/auth-actions"
import { passwordFeedback } from "@/lib/password-feedback"
import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import { GithubIcon, Notebook, Music } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"

/* -------------------- Schema -------------------- */
const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type FormValues = z.infer<typeof schema>
type OAuthProvider = "github" | "notion" | "spotify"
type Flow = "base" | "otp"

/* -------------------- Supabase -------------------- */
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* -------------------- UI -------------------- */
const inputClass =
  "w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"

const cardClass =
  "w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl p-6 shadow-2xl border border-white/10"

export default function RegistroIOSAuth() {
  const [flow, setFlow] = useState<Flow>("base")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pwdFeedback, setPwdFeedback] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null)

  /* ---- Phone OTP ---- */
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  /* -------------------- Email / Password -------------------- */
  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const result = await registerAction(data)
      if (result?.error) {
        setError(result.error)
        return
      }
      setMessage("Registro completado. Revisa tu correo.")
    } catch {
      setError("Error de servidor")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (value: string) => {
    const feedback = await passwordFeedback({
      length: value.length,
      hasUpper: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSymbol: /[^a-zA-Z0-9]/.test(value),
    })
    if (typeof feedback === "string") setPwdFeedback(feedback)
    else setPwdFeedback(JSON.stringify(feedback))
  }

  /* -------------------- Phone OTP -------------------- */
  const sendOTP = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({ phone })

    if (error) {
      setError(error.message)
    } else {
      setFlow("otp")
    }

    setLoading(false)
  }

  const verifyOTP = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Registro completado con teléfono")
    }

    setLoading(false)
  }

  /* -------------------- OAuth -------------------- */
  const handleOAuthRegister = async (provider: OAuthProvider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
    return error
  }

  const onOAuthClick = async (provider: OAuthProvider) => {
    setError(null)
    setMessage(null)
    setOauthLoading(provider)

    try {
      const oauthError = await handleOAuthRegister(provider)
      if (oauthError) setError(oauthError.message)
    } catch {
      setError("Error de servidor")
    } finally {
      setOauthLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
      <AnimatePresence mode="wait">
        {/* ================= BASE ================= */}
        {flow === "base" && (
          <motion.div
            key="base"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className={cardClass}
          >
            <h1 className="text-xl font-semibold text-white text-center">
              Crear cuenta
            </h1>

            {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
            {message && <p className="text-emerald-400 text-sm" role="status">{message}</p>}

            {/* Email */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
              <input
                {...register("name")}
                placeholder="Nombre"
                className={inputClass}
                disabled={loading}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

              <input
                {...register("email")}
                placeholder="Correo"
                className={inputClass}
                disabled={loading}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

              <input
                {...register("password", {
                  onChange: (e) => handlePasswordChange(e.target.value),
                })}
                type="password"
                placeholder="Contraseña"
                className={inputClass}
                disabled={loading}
              />
              {pwdFeedback && <p className="text-emerald-400 text-xs">{pwdFeedback}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-black"
              >
                {loading ? "Registrando..." : "Registrarme con Email"}
              </button>

              <a href="/login" className="text-sm text-emerald-300 hover:underline block text-center">
                ¿Ya tienes cuenta? Inicia sesión
              </a>
            </form>

            {/* Phone */}
            <div className="mt-6 space-y-3">
              <input
                placeholder="+52 9511234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                disabled={loading}
              />
              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full rounded-2xl bg-white/10 py-3 text-white"
              >
                {loading ? "Enviando código..." : "Continuar con Teléfono"}
              </button>
            </div>

            {/* OAuth */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => onOAuthClick("github")}
                className="w-full rounded-2xl bg-white/10 py-3 text-white flex justify-center gap-3"
                disabled={oauthLoading !== null || loading}
              >
                <GithubIcon /> {oauthLoading === "github" ? "Conectando..." : "GitHub"}
              </button>
              <button
                onClick={() => onOAuthClick("notion")}
                className="w-full rounded-2xl bg-white/10 py-3 text-white flex justify-center gap-3"
                disabled={oauthLoading !== null || loading}
              >
                <Notebook /> {oauthLoading === "notion" ? "Conectando..." : "Notion"}
              </button>
              <button
                onClick={() => onOAuthClick("spotify")}
                className="w-full rounded-2xl bg-white/10 py-3 text-white flex justify-center gap-3"
                disabled={oauthLoading !== null || loading}
              >
                <Music /> {oauthLoading === "spotify" ? "Conectando..." : "Spotify"}
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= OTP ================= */}
        {flow === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className={cardClass}
          >
            <h2 className="text-lg font-semibold text-white text-center">
              Código SMS
            </h2>

            {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
            {message && <p className="text-emerald-400 text-sm" role="status">{message}</p>}

            <input
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`${inputClass} mt-6 text-center tracking-widest`}
              disabled={loading}
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-black"
            >
              {loading ? "Verificando..." : "Confirmar registro"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}