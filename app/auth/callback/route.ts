import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

type CookieOptions = {
  path?: string
  maxAge?: number
  domain?: string
  sameSite?: "lax" | "strict" | "none"
  secure?: boolean
  expires?: Date
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const redirectTo = searchParams.get("redirect_to") ?? "/dashboard"

  if (!code) {
    return NextResponse.redirect(new URL("/login", origin))
  }

  const cookieStore = await cookies()
  const response = NextResponse.redirect(new URL(redirectTo, origin))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }))
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, ...options }) => {
            response.cookies.set({ name, value, ...(options as CookieOptions) })
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL("/login", origin))
  }

  return response
}