import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

/* ===============================
   RUTAS PÚBLICAS A REDIRIGIR
================================ */
const redirectRoutes = [
  "/faq",
  "/links",
  "/conduct",
  "/privacy",
  "/talleres/pintura",
  "/planifica-visita",
  "/templos",
  "/primerpaso",
  "/terms",
  "/contact",
  "/oracion",
  "/presentation",
  "/donativos",
  "/conf",
]

/* ===============================
   RUTAS PROTEGIDAS (AUTH)
================================ */
const protectedRoutes = ["/dashboard", "/account"]

/* ===============================
   RUTAS SOLO ADMIN
================================ */
const adminRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  /* ===============================
     NORMALIZAR SLASH FINAL
  =============================== */
  let normalized = pathname
  if (normalized.endsWith("/") && normalized !== "/") {
    normalized = normalized.slice(0, -1)
  }

  /* ===============================
     REDIRECCIONES EXISTENTES
  =============================== */
  for (const route of redirectRoutes) {
    if (normalized === route || normalized.startsWith(route + "/")) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  /* ===============================
     CLIENTE AUTH (cookies RW)
  =============================== */
  const response = NextResponse.next()

  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          response.cookies.set({
            name,
            value: "",
            ...options,
            maxAge: 0,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser()

  const isProtected = protectedRoutes.some((route) =>
    normalized.startsWith(route)
  )

  /* ===============================
     BLOQUEAR RUTAS PRIVADAS
  =============================== */
  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirectedFrom", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  /* ===============================
     ROLES: SOLO ADMIN (CLIENTE DB)
  =============================== */
  if (user && adminRoutes.some((r) => normalized.startsWith(r))) {
    const supabaseDb = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value
          },
        },
      }
    )

    const { data: profile, error } = await supabaseDb
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (error || profile?.role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      )
    }
  }

  /* ===============================
     EVITAR LOGIN / REGISTER
  =============================== */
  if (
    user &&
    (normalized === "/login" || normalized === "/register")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  return response
}

/* ===============================
   MATCHER
================================ */
export const config = {
  matcher: [
    "/",
    "/faq",
    "/faq/:path*",
    "/links",
    "/links/:path*",
    "/conduct",
    "/conduct/:path*",
    "/privacy",
    "/privacy/:path*",
    "/talleres/pintura",
    "/talleres/pintura/:path*",
    "/planifica-visita",
    "/planifica-visita/:path*",
    "/templos",
    "/templos/:path*",
    "/primerpaso",
    "/primerpaso/:path*",
    "/terms",
    "/terms/:path*",
    "/contact",
    "/contact/:path*",
    "/oracion",
    "/oracion/:path*",
    "/presentation",
    "/presentation/:path*",
    "/donativos",
    "/donativos/:path*",
    "/conf",
    "/conf/:path*",

    // 🔐 auth
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
}