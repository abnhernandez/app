import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const protectedRoutes = ["/dashboard", "/account", "/admin"]
const adminRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const code = request.nextUrl.searchParams.get("code")

  // OAuth callback fallback: if Supabase redirects to / with ?code=
  if (pathname === "/" && code) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/callback"
    return NextResponse.redirect(url)
  }

  // 🔐 Rutas protegidas
  if (protectedRoutes.some(r => pathname.startsWith(r)) && !user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 👑 Solo admin
  if (user && adminRoutes.some(r => pathname.startsWith(r))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Evitar login si ya está logueado
  if (user && (pathname === "/login" || pathname === "/registro")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/login",
    "/registro",
  ],
}