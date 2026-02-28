"use client"

import { loginAction } from "@/lib/auth-actions"
import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
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
  "w-full px-4 py-3 rounded-2xl border border-zinc-200/80 bg-white/80 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"

const oauthIconButtonClass =
  "h-12 w-12 rounded-2xl border border-white/10 bg-white/5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.18)]"

function GithubIconOfficial() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.88-.02-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.06A9.22 9.22 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.9-1.34 2.74-1.06 2.74-1.06.55 1.41.2 2.45.1 2.71.64.73 1.03 1.66 1.03 2.79 0 3.98-2.35 4.86-4.58 5.11.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function NotionIconOfficial() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M4.46 3.44c.38-.31.95-.33 1.45-.02l13.15 8.08c.52.32.84.9.84 1.52v7.78c0 1.01-.83 1.83-1.85 1.83H6.3c-1.03 0-1.86-.82-1.86-1.83V4.92c0-.6.27-1.18.72-1.48ZM7.7 7.5c-.52 0-.95.43-.95.95v9.1c0 .53.43.95.95.95h8.6c.53 0 .95-.42.95-.95V10.2a.95.95 0 0 0-.44-.8L9.07 7.62a.94.94 0 0 0-.49-.12H7.7Zm2.3 3.4c0-.3.24-.54.54-.54h2.9c.3 0 .54.24.54.54v5.2c0 .3-.24.54-.54.54h-.64a.54.54 0 0 1-.46-.26l-2.54-3.98v3.7c0 .3-.24.54-.54.54H9.48a.54.54 0 0 1-.54-.54v-5.2Z" />
    </svg>
  )
}

function SpotifyIconOfficial() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 2C6.49 2 2 6.49 2 12c0 5.5 4.49 10 10 10s10-4.5 10-10C22 6.49 17.51 2 12 2Zm4.53 14.45c-.2.33-.63.44-.96.24-2.64-1.62-5.96-1.98-9.86-1.06-.37.09-.74-.14-.83-.5-.09-.37.14-.74.5-.83 4.26-.99 7.96-.58 10.9 1.23.33.2.44.63.25.96Zm1.33-2.96c-.25.4-.77.52-1.17.27-3.02-1.85-7.63-2.38-11.2-1.3-.45.14-.92-.12-1.06-.57-.13-.45.12-.92.57-1.06 4.07-1.23 9.12-.64 12.59 1.48.4.25.52.77.27 1.18Zm.11-3.07c-3.62-2.15-9.6-2.35-13.07-1.3-.53.16-1.09-.14-1.25-.67-.16-.53.14-1.09.67-1.25 3.99-1.2 10.63-.97 14.81 1.5.48.29.64.91.35 1.39-.29.48-.91.64-1.39.35Z" />
    </svg>
  )
}

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
    <div className="space-y-5">
      {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 md:space-y-4">
          <label className="space-y-2 block">
            <span className="text-xs text-white/60">Correo</span>
            <input
              {...register("email")}
              type="email"
              placeholder="tu@correo.com"
              className={inputClass}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </label>

          <label className="space-y-2 block">
            <span className="text-xs text-white/60">Contraseña</span>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={inputClass}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <div className="flex items-center justify-between text-[11px] text-white/70">
            <a href="/registro" className="text-white/80">Crear cuenta</a>
            <a href="/forgot-password" className="text-white/80">¿Olvidaste tu contraseña?</a>
          </div>
      </form>

      <div>
        <div className="flex items-center gap-3 text-[11px] text-white/40">
          <span className="h-px w-full bg-white/10" />
          O continúa con
          <span className="h-px w-full bg-white/10" />
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => onOAuthClick("github")}
            className={oauthIconButtonClass}
            disabled={oauthLoading !== null}
            aria-label="Continuar con GitHub"
            title="GitHub"
          >
            <GithubIconOfficial />
          </button>

          <button
            onClick={() => onOAuthClick("notion")}
            className={oauthIconButtonClass}
            disabled={oauthLoading !== null}
            aria-label="Continuar con Notion"
            title="Notion"
          >
            <NotionIconOfficial />
          </button>

          <button
            onClick={() => onOAuthClick("spotify")}
            className={oauthIconButtonClass}
            disabled={oauthLoading !== null}
            aria-label="Continuar con Spotify"
            title="Spotify"
          >
            <SpotifyIconOfficial />
          </button>
        </div>
      </div>
    </div>
  )
}