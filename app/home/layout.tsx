import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import GlowMouseEffect from "./GlowMouseEffect"
import "./globals.css" // <-- Cambié a tu CSS PRO

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Monte Sion Oaxaca | Iglesia Cristiana",
  description:
    "Bienvenido a casa. Un lugar para crecer en la fe, recibir apoyo y vivir la Palabra con propósito. Iglesia Cristiana en Santa María Atzompa, Oaxaca.",
  keywords: [
    "iglesia cristiana",
    "oaxaca",
    "atzompa",
    "monte sion",
    "discipulado",
    "comunidad cristiana",
  ],
  authors: [{ name: "Monte Sion Oaxaca" }],
  openGraph: {
    title: "Monte Sion Oaxaca | Iglesia Cristiana",
    description:
      "Un lugar para crecer en la fe, recibir apoyo y vivir la Palabra con propósito.",
    type: "website",
    locale: "es_MX",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1816" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className="min-h-screen worship-mode vigilia-mode worship-mode-grain">
      <GlowMouseEffect />
      <div
        className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </div>
    </section>
  )
}