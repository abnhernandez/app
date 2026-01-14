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
  anonimo: boolean

  // 🔐 Vienen cifrados desde el frontend (E2EE)
  peticion_cipher: string
  peticion_iv: string
  peticion_key_rsa: string
}

// ---------- VALIDAR CLAVES ----------
if (
  !process.env.PETICION_AES_KEY ||
  !process.env.PETICION_HMAC_KEY ||
  !process.env.RSA_PRIVATE_KEY
) {
  throw new Error("Faltan claves criptográficas en variables de entorno")
}

const AES_KEY = Buffer.from(process.env.PETICION_AES_KEY, "hex") // 32 bytes
const HMAC_KEY = process.env.PETICION_HMAC_KEY
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY

// ---------- SUPABASE ----------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ---------- EMAIL ----------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ---------- CRYPTO ----------
function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex")
}

// Descifrado E2EE (RSA → AES)
function decryptE2EE(cipherHex: string, ivHex: string, keyHex: string) {
  const privateKey = crypto.createPrivateKey({
    key: process.env.RSA_PRIVATE_KEY!,
    format: "pem",
    type: "pkcs8",
  })

  const aesKey = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(keyHex, "hex")
  )

  const cipherBuffer = Buffer.from(cipherHex, "hex")
  const authTag = cipherBuffer.slice(cipherBuffer.length - 16)
  const encrypted = cipherBuffer.slice(0, cipherBuffer.length - 16)

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    aesKey,
    Buffer.from(ivHex, "hex")
  )

  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  return decrypted.toString("utf8")
}

// Cifrado para DB (AES servidor)
function encryptAES(text: string) {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", AES_KEY, iv)

  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    iv: iv.toString("hex"),
    data: encrypted.toString("hex"),
    tag: tag.toString("hex"),
  }
}

// Firma HS256
function signHMAC(data: string) {
  return crypto.createHmac("sha256", HMAC_KEY).update(data).digest("hex")
}

// ---------- UTIL ----------
function sanitize(text: string) {
  return text.replace(/<[^>]*>?/gm, "").trim()
}

// ---------- SERVER ACTION ----------
export async function crearRegistro(data: RegistroData) {
  try {
    const h = await headers()

    const ipRaw =
      h.get("x-forwarded-for")?.split(",")[0] ??
      h.get("x-real-ip") ??
      "unknown"

    const ipHash = sha256(ipRaw)

    const country =
      h.get("x-vercel-ip-country") ??
      h.get("cf-ipcountry") ??
      "MX"

    // 🚦 Rate limits
    await rateLimit(`ip:${ipHash}`, 5, 60_000)

    if (!data.anonimo && data.email) {
      await rateLimit(`email:${sha256(data.email)}`, 3, 60_000)
    }

    // 🔓 Descifrar petición que vino del navegador (E2EE)
    const textoPlano = decryptE2EE(
      data.peticion_cipher,
      data.peticion_iv,
      data.peticion_key_rsa
    )

    // 🧼 Sanitizar
    const peticionLimpia = sanitize(textoPlano)

    // 🔐 Volver a cifrar para base de datos
    const cipher = encryptAES(peticionLimpia)

    // ✍️ Firma HS256
    const hmac = signHMAC(cipher.data)

    // 🧂 Hash de datos sensibles
    const emailHash = data.email ? sha256(data.email) : null
    const telefonoHash = data.telefono ? sha256(data.telefono) : null

    // 💾 Guardar en Supabase
    const { error } = await supabase.from("registro").insert({
      nombre: data.anonimo ? null : data.nombre || null,
      apellido: data.anonimo ? null : data.apellido || null,

      email_hash: emailHash,
      telefono_hash: telefonoHash,

      peticion_cipher: cipher.data,
      peticion_iv: cipher.iv,
      peticion_tag: cipher.tag,
      peticion_hmac: hmac,

      anonimo: data.anonimo,
      ip_hash: ipHash,
      pais: country,
    })

    if (error) {
      console.error("SUPABASE ERROR:", error)
      throw new Error("Error al guardar la petición")
    }

    // 📩 Correo de confirmación
    if (!data.anonimo && data.email) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: data.email,
          subject: "🙏 Hemos recibido tu petición de oración",
          html: `
            <h2>Hola, ${data.nombre}</h2>
            <p>Tu petición fue recibida de forma segura y confidencial.</p>
            <p>Estamos orando por ti.</p>
            <p><em>Iglesia Monte Sion</em></p>
          `,
        })
      } catch (mailError) {
        console.error("EMAIL ERROR:", mailError)
      }
    }

    return { ok: true }
} catch (err: any) {
  console.error("🔥 ERROR REAL:", err)
  return {
    ok: false,
    debug: err?.message || String(err),
  }
}
}