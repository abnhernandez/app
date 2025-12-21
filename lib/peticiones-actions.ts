"use server"

import { createClient } from "@supabase/supabase-js"
import { getSupabaseServer } from "@/lib/supabase-server"
import OpenAI from "openai"

/* ===============================
   SUPABASE ADMIN (SERVICE ROLE)
================================ */
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/* ===============================
   TYPES
================================ */
export type EstadoPeticion =
  | "pending"      // En espera de aprobación
  | "orando"       // En oración
  | "info"         // Requiere más información
  | "completada"   // Completada
  | "rechazada"    // Rechazada

/* ===============================
   SOLO ADMIN
================================ */
async function assertAdmin() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("No autenticado")
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (error) throw error

  if (data?.role !== "admin") {
    throw new Error("No autorizado")
  }
}

/* ===============================
   OBTENER PETICIONES
================================ */
export async function getPeticiones() {
  await assertAdmin()

  const { data, error } = await supabaseAdmin
    .from("registro")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

/* ===============================
   CAMBIAR ESTADO
================================ */
export async function updateEstadoPeticion(
  id: string,
  estado: EstadoPeticion
) {
  await assertAdmin()

  const { error } = await supabaseAdmin
    .from("registro")
    .update({ estado })
    .eq("id", id)

  if (error) throw error
}

/* ===============================
   ELIMINAR PETICIÓN
================================ */
export async function deletePeticion(id: string) {
  await assertAdmin()

  const { error } = await supabaseAdmin
    .from("registro")
    .delete()
    .eq("id", id)

  if (error) throw error
}

/* ===============================
   🤖 IA — RESUMEN CORTO
================================ */
export async function generarResumenIA(
  id: string,
  textoPeticion: string
) {
  await assertAdmin()

  if (!textoPeticion || textoPeticion.length < 10) {
    throw new Error("Texto de petición inválido")
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Resume esta petición de oración en una sola frase corta, clara y respetuosa, sin juicios ni lenguaje técnico.",
      },
      {
        role: "user",
        content: textoPeticion,
      },
    ],
    max_tokens: 60,
  })

  const resumen =
    completion.choices[0]?.message?.content?.trim()

  if (!resumen) {
    throw new Error("No se pudo generar el resumen")
  }

  const { error } = await supabaseAdmin
    .from("registro")
    .update({ resumen_ia: resumen })
    .eq("id", id)

  if (error) throw error

  return resumen
}