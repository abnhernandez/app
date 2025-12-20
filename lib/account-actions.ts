"use server"

import { getSupabaseServer } from "@/lib/supabase-server"

export async function updateAccount(data: {
  name: string
  bio?: string
  avatar_url?: string | null
}) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("No autenticado")
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

    if (error) throw error
  }