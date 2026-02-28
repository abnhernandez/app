"use server"

import { getSupabaseServer } from "@/lib/supabase-server"

export async function uploadAvatar(file: File) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("No autenticado")
  }

  const fileExt = file.name.split(".").pop()
  const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true })

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  // 🔥 actualizamos profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: data.publicUrl })
    .eq("id", user.id)

  if (updateError) {
    throw updateError
  }

  return data.publicUrl
}