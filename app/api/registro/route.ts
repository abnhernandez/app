import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true para 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Insertar en Supabase
    const { data, error } = await supabase.from("registro").insert(body).select();
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Enviar correo al usuario
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: body.email,
      subject: "¡Registro exitoso en Amor Verdadero!",
      html: `
        <h1>Hola ${body.nombre}!</h1>
        <p>Bienvenid@ a la Comunidad en Amor Verdadero.</p>
        <p>Haz clic en el siguiente enlace para unirte a comunidad en Whatsapp:</p>
        <a href="https://chat.whatsapp.com/HubaXyY3G6NEI7QRQ1NjZC">Ingresar a la Comunidad</a>
      `,
    });

    return NextResponse.json({ message: "Registro guardado y correo enviado", data }, { status: 200 });
  } catch (e: any) {
    console.error("Server error:", e);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}