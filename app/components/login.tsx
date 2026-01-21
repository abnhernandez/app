"use client"

import { loginAction } from "@/lib/auth-actions"
import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import { Github, Notebook, Music } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

/* -------------------- Schema -------------------- */
const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Contraseña inválida"),
})

type FormValues = z.infer<typeof schema>
type OAuthProvider = "github" | "notion" | "spotify"

/* -------------------- Supabase -------------------- */
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* -------------------- OAuth -------------------- */
const handleOAuthLogin = async (provider: OAuthProvider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  })
  return error
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

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setError(null)

    try {
      const result = await loginAction(data)
      if (result?.error) setError(result.error)
    } catch {
      setError("Error de servidor")
    } finally {
      setLoading(false)
    }
  }

  const onOAuthClick = async (provider: OAuthProvider) => {
    setError(null)
    setOauthLoading(provider)
    try {
      const oauthError = await handleOAuthLogin(provider)
      if (oauthError) setError(oauthError.message)
    } catch {
      setError("Error de servidor")
    } finally {
      setOauthLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 p-6 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl"
      >
        <h2 className="text-center text-xl font-bold">Login</h2>

        {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

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
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <div className="flex items-center justify-between text-sm">
          <a href="/registro" className="text-emerald-700 hover:underline">
            Crear cuenta
          </a>
          <a href="/forgot-password" className="text-emerald-700 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>

      {/* OAuth */}
      <div className="w-full max-w-md space-y-3">
        <button
          onClick={() => onOAuthClick("github")}
          className={oauthButtonClass}
          disabled={oauthLoading !== null}
        >
          <Github className="w-5 h-5" />
          <span>
            {oauthLoading === "github" ? "Conectando..." : "Continuar con GitHub"}
          </span>
        </button>

        <button
          onClick={() => onOAuthClick("notion")}
          className={oauthButtonClass}
          disabled={oauthLoading !== null}
        >
          <Notebook className="w-5 h-5" />
          <span>
            {oauthLoading === "notion" ? "Conectando..." : "Continuar con Notion"}
          </span>
        </button>

        <button
          onClick={() => onOAuthClick("spotify")}
          className={oauthButtonClass}
          disabled={oauthLoading !== null}
        >
          <Music className="w-5 h-5" />
          <span>
            {oauthLoading === "spotify" ? "Conectando..." : "Continuar con Spotify"}
          </span>
        </button>
      </div>
    </div>
  )
}