"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import * as z from "zod";

// ---------------- VALIDACIONES ----------------
const schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
  email: z.string().email("Correo electrónico inválido.").refine(
    (email) => {
      const blockedDomains = ["example.com", "dominio.com", "tusitio.com", "test.com", "demo.com", "10minutemail.com", "tempmail.com", "guerrillamail.com"];
      const domain = email.split("@")[1]?.toLowerCase();
      return domain && !blockedDomains.includes(domain);
    },
    "Ingresa un correo válido y real."
  ),
  telefono: z.string().min(10, "El número de teléfono debe tener al menos 10 dígitos.").refine(
    (phone) => !/^(\d)\1{9,}|^(1234567890|0000000000|1111111111)/.test(phone),
    "Ingresa un número telefónico válido y real."
  ),
  peticion: z.string().min(1, "Escribe tu petición de oración."),
});

type FormValues = z.infer<typeof schema>;

// dedupe helpers
const unique = (arr: string[]) => Array.from(new Set(arr)).filter(Boolean);

const commonInputClasses = "w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none";

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setSuccess(searchParams.get("success"));
    }
  }, []);

  const onSubmit = async (data: FormValues) => {

    setLoading(true);
    setErrorMessage(null); // Limpiar mensajes de error previos

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        reset(); // limpia el formulario
        setSuccessMessage("¡Hemos recibido tu petición y estamos intercediento por tu vida! Revisa tu correo para más detalles y recuerda; Confía en el SEÑOR de todo corazón y no te apoyes en tu propia inteligencia. Reconócelo en todos tus caminos y él enderezará tus sendas. Proverbios 3:5-6 NVI");
      } else {
        setErrorMessage(result.error?.message || "Ocurrió un error al registrarte.");
      }
    } catch (err) {
      setErrorMessage("Ocurrió un error al enviar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-2xl text-black dark:text-white font-bold text-center text-lg md:text-xl select-none">
          Petición de oración · Monte Sion
        </div>

        {success === "1" && (
          <div className="p-4 mb-4 rounded bg-green-200 text-green-900">
            Registro exitoso. Revisa tu correo para el enlace de ingreso a la Comunidad.
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-4 rounded bg-green-200 text-green-900">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-4 mb-4 rounded bg-red-200 text-red-900">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 backdrop-blur-xl p-6 rounded-2xl bg-white/60 dark:bg-black/40">
          {/* NOMBRE / APELLIDO */}
          <div className="grid grid-cols-2 gap-4">
            <input {...register("nombre")} placeholder="Nombre *" className={commonInputClasses} />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            <input {...register("apellido")} placeholder="Apellido *" className={commonInputClasses} />
            {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
          </div>

          {/* EMAIL */}
          <input {...register("email")} placeholder="Ingresa tu correo electrónico*" className={commonInputClasses} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* TELÉFONO */}
          <div className="space-y-1">
            <Controller
              name="telefono"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country="mx"
                  enableSearch
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-none"
                  inputClass="!w-full !h-12 !rounded-xl !bg-white dark:!bg-white/10 !border !border-zinc-200 dark:!border-white/20 !text-black dark:!text-white !placeholder:text-zinc-500 dark:!placeholder:text-zinc-300 !focus:ring-2 !focus:ring-emerald-400 !focus:outline-none !pl-14"
                  inputStyle={{ paddingLeft: "56px" }}
                  value={field.value || ""}
                  onChange={(val: string) => field.onChange(val)}
                />
              )}
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Usa un número válido para recibir información por WhatsApp.
            </p>
            {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
          </div>

          {/* Petición de oración */}
          <div className="space-y-1">
            <textarea {...register("peticion")} placeholder="Escribe tu petición de oración *" rows={4} className={commonInputClasses + " resize-none"} />
            {errors.peticion && <p className="text-red-500 text-sm">{errors.peticion.message}</p>}
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black text-white hover:opacity-90 transition font-bold dark:bg-white dark:text-black dark:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            {loading ? "Enviando…" : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}