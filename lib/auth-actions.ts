"use server"

import { getSupabaseServer } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

/* =========================
   LOGIN
========================= */
export async function loginAction(data: {
  email: string
  password: string
}) {
  const supabase = await getSupabaseServer()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: "Credenciales inválidas" }
  }

  redirect("/dashboard")
}

/* =========================
   LOGIN INLINE (MODAL)
========================= */
export async function loginInlineAction(data: {
  email: string
  password: string
}) {
  const supabase = await getSupabaseServer()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: "Credenciales inválidas" }
  }

  return { success: true }
}

/* =========================
   REGISTRO
========================= */
export async function registerAction(data: {
  name: string
  email: string
  password: string
}) {
  const supabase = await getSupabaseServer()

  // 1️⃣ Crear usuario en auth.users
  const { data: authData, error } =
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name, // se guarda en raw_user_meta_data
        },
      },
    })

  if (error || !authData.user) {
    return { error: error?.message ?? "Error al registrar" }
  }

  // 2️⃣ Crear perfil en public.profiles (duplicando email y nombre)
  await supabase.from("profiles").insert({
    id: authData.user.id,
    name: data.name,
    email: data.email,
  })

  return { success: true }
}

/* =========================
   FORGOT PASSWORD
========================= */
export async function forgotPasswordAction(email: string) {
  const supabase = await getSupabaseServer()

  const { error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    }
  )

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

/* =========================
   RESET PASSWORD
========================= */
export async function resetPasswordAction(password: string) {
  const supabase = await getSupabaseServer()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/login")
}

/* =========================
   DELETE ACCOUNT
========================= */
export async function deleteAccountAction() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No autenticado" }
  }

  // borrar perfil (si tienes FK)
  await supabase.from("profiles").delete().eq("id", user.id)

  // cerrar sesión
  await supabase.auth.signOut()

  revalidatePath("/")
  redirect("/")
}