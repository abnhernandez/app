import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()
  if (!email || !password) return NextResponse.json({ error: "Email y contraseña obligatorios" }, { status: 400 })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ message: "Usuario registrado", user: data.user })
}