"use server"

import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"
import { rateLimit } from "@/lib/rate-limit"

type RegistroData = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  peticion: string
}

// 🔐 Cliente Supabase ADMIN (solo server)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ✉️ Transporter de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function crearRegistro(data: RegistroData) {

    rateLimit(data.email, 3, 60_000)

  /* ===============================
     INSERT EN SUPABASE
  =============================== */
  const { error } = await supabase
    .from("registro")
    .insert({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      peticion: data.peticion,
    })

  if (error) {
    throw new Error(error.message)
  }

  /* ===============================
     ENVÍO DE EMAIL
  =============================== */
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: "¡Hemos recibido tu petición y estamos en oración!",
    html: `
      <h2>Hola, ${data.nombre}</h2>
      <p>Hemos recibido tu petición de oración:</p>
      <blockquote>${data.peticion}</blockquote>
      <p>
        Estaremos intercediendo por tu vida.  
        Si necesitamos más información, nos pondremos en contacto contigo.
      </p>
      <p>
        <a href="https://youtube.com/@montesionoaxaca">
          Te invitamos a seguir creciendo en la Palabra de Dios
        </a>
      </p>
      <p><em>Monte Sion</em></p>
    `,
  })
}