"use client"

import { registerAction } from "@/lib/auth-actions"
import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import { Github, Notebook, Music } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

/* -------------------- Schema -------------------- */
const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type FormValues = z.infer<typeof schema>
type OAuthProvider = "github" | "notion" | "spotify"

/* -------------------- Supabase -------------------- */
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* -------------------- OAuth -------------------- */
const handleOAuthRegister = async (provider: OAuthProvider) => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  })
}

/* -------------------- UI -------------------- */
const inputClass =
  "w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"

const oauthButtonClass = `
  flex items-center justify-center gap-3
  w-full
  rounded-xl px-6 py-3
  font-bold
  backdrop-blur-xl
  border border-white/20
  shadow-[0_8px_30px_rgb(0,0,0,0.12)]
  hover:opacity-90
`

export default function RegistroForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

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

      setMessage("Usuario registrado correctamente")
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 p-6 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl"
      >
        <h2 className="text-center text-xl font-bold">Registro</h2>

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          {...register("name")}
          placeholder="Nombre"
          className={inputClass}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="Correo"
          className={inputClass}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Contraseña"
          className={inputClass}
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      {/* OAuth Providers */}
      <div className="w-full max-w-md space-y-3">
        <button
          onClick={() => handleOAuthRegister("github")}
          className={oauthButtonClass}
        >
          <Github className="w-5 h-5" />
          <span>Registrarse con GitHub</span>
        </button>

        <button
          onClick={() => handleOAuthRegister("notion")}
          className={oauthButtonClass}
        >
          <Notebook className="w-5 h-5" />
          <span>Registrarse con Notion</span>
        </button>

        <button
          onClick={() => handleOAuthRegister("spotify")}
          className={oauthButtonClass}
        >
          <Music className="w-5 h-5" />
          <span>Registrarse con Spotify</span>
        </button>
      </div>
    </div>
  )
}