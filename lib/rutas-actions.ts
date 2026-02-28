"use server"

import { createServerClient, type SetAllCookies } from "@supabase/ssr"
import { cookies } from "next/headers"

type CookiePayload = Parameters<SetAllCookies>[0][number]

export async function guardarUbicacionUsuario({
  userLat,
  userLng,
}: {
  userLat: number
  userLng: number
}) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: CookiePayload[]) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from("rutas_iglesia").insert({
    user_id: user?.id ?? null,
    origen_lat: userLat,
    origen_lng: userLng,
  })

  if (error) {
    console.error("SUPABASE ERROR:", error)
    throw new Error(error.message)
  }

  return { ok: true }
}