"use server"

import { getSupabaseServer } from "@/lib/supabase-server"

/* =====================
   ADMIN
===================== */
export async function getAvisosAdmin() {
  const supabase = await getSupabaseServer()

  const { data, error } = await supabase
    .from("avisos")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createAviso(formData: FormData) {
  const supabase = await getSupabaseServer()

  const titulo = formData.get("titulo") as string
  const contenido = formData.get("contenido") as string

  if (!titulo || !contenido) {
    throw new Error("Datos incompletos")
  }

  await supabase.from("avisos").insert({
    titulo,
    contenido,
  })
}

export async function togglePublicarAviso(id: string, publicado: boolean) {
  const supabase = await getSupabaseServer()

  await supabase
    .from("avisos")
    .update({
      publicado,
      published_at: publicado ? new Date().toISOString() : null,
    })
    .eq("id", id)
}

export async function deleteAviso(id: string) {
  const supabase = await getSupabaseServer()

  await supabase
    .from("avisos")
    .delete()
    .eq("id", id)
}

/* =====================
   USERS
===================== */
export async function getAvisosPublicados() {
  const supabase = await getSupabaseServer()

  const { data, error } = await supabase
    .from("avisos")
    .select("id, titulo, contenido, published_at")
    .eq("publicado", true)
    .order("published_at", { ascending: false })

  if (error) throw error
  return data
}