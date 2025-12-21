"use client"

import { createBrowserClient } from "@supabase/auth-helpers-nextjs"

export default function GithubButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button
      onClick={handleGithubLogin}
      className="btn w-full flex items-center justify-center gap-2"
    >
      Continuar con GitHub
    </button>
  )
}