import React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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
  metadataBase: new URL("https://montesion.me"),
  title: "Monte Sion Oaxaca | Iglesia Cristiana",
  description:
    "Bienvenido a casa. Iglesia Cristiana en Santa María Atzompa, Oaxaca.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b2b23",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}