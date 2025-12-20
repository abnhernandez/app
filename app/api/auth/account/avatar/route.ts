import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("avatar") as File
  if (!file) return NextResponse.json({ error: "Archivo requerido" }, { status: 400 })

  const filePath = `${user.id}/${Date.now()}-${file.name}`
  const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 })

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)
  await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", user.id)

  return NextResponse.json({ avatar_url: data.publicUrl })
}