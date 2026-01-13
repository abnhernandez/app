"use server"

import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"
import { rateLimit } from "@/lib/rate-limit"
import { headers } from "next/headers"
import crypto from "crypto"

type RegistroData = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  peticion: string
  anonimo: boolean
}

// Cliente Supabase con Service Role (solo server)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Transporter de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Utilidades
function hashIP(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex")
}

function sanitize(text: string) {
  return text.replace(/<[^>]*>?/gm, "").trim()
}

export async function crearRegistro(data: RegistroData) {
  try {
    const h = await headers()

    const ipRaw =
      h.get("x-forwarded-for")?.split(",")[0] ??
      h.get("x-real-ip") ??
      "unknown"

    const ipHash = hashIP(ipRaw)

    const country =
      h.get("x-vercel-ip-country") ??
      h.get("cf-ipcountry") ??
      "MX"

    // 🔒 Rate limit por IP
    await rateLimit(`ip:${ipHash}`, 5, 60_000)

    // 🔒 Rate limit por correo (solo si no es anónimo)
    if (!data.anonimo && data.email) {
      await rateLimit(`email:${data.email}`, 3, 60_000)
    }

    const peticionLimpia = sanitize(data.peticion)

    // 💾 Guardar en Supabase
    const { error } = await supabase.from("registro").insert({
      nombre: data.anonimo ? null : data.nombre || null,
      apellido: data.anonimo ? null : data.apellido || null,
      email: data.anonimo ? null : data.email || null,
      telefono: data.anonimo ? null : data.telefono || null,
      peticion: peticionLimpia,
      anonimo: data.anonimo,
      ip_hash: ipHash,
      pais: country,
    })

    if (error) {
      console.error("SUPABASE ERROR:", error)
      throw new Error("Error al guardar la petición")
    }

    // ✉️ Enviar correo solo si NO es anónimo
    if (!data.anonimo && data.email) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: data.email,
          subject: "🙏 Hemos recibido tu petición de oración",
          html: `
            <h2>Hola, ${data.nombre}</h2>
            <p>Hemos recibido tu petición de oración:</p>
            <blockquote>${peticionLimpia}</blockquote>
            <p>Estaremos intercediendo por tu vida.</p>
            <p><em>Iglesia Monte Sion</em></p>
          `,
        })
      } catch (mailError) {
        console.error("EMAIL ERROR:", mailError)
        // No se rompe el flujo si falla el correo
      }
    }

    return { ok: true }
  } catch (err: any) {
    console.error("SERVER ACTION ERROR:", err)
    throw new Error("No se pudo guardar la petición. Intenta nuevamente.")
  }
}