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
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Enviar correo al usuario
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: body.email,
      subject: "¡Hemos recibido tu petición y estamos en oración!",
      html: `
        <h1>Hola, ${body.nombre}!</h1>
        <p>Tu petición es: ${body.petición}</p>
        <p>Si requerimos mayor información nos pondremos en contacto por Whatsapp:</p>
        <a href="https://youtube.com/@montesionoaxaca">Te invitamos a seguir creciendo en la Palabra de Dios, dando click sobre este texto.</a>
      `,
    });

    return NextResponse.json({ message: "Registro guardado y correo enviado", data }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}