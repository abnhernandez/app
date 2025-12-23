"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => 
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  // 🔐 Validar usuario autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("No autorizado")

  // 💾 Guardar SOLO ubicación
  const { error } = await supabase.from("rutas_iglesia").insert({
    user_id: user.id,
    origen_lat: userLat,
    origen_lng: userLng,
  })

  if (error) {
    console.error("SUPABASE ERROR:", error)
    throw new Error(error.message)
  }

  return { ok: true }
}