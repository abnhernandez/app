"use client"

import Link from "next/link"
import { Construction, Home, User } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-zinc-100 dark:bg-black text-black dark:text-white">
      <div className="max-w-md w-full text-center space-y-6">
        {/* ICONO */}
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center">
            <Construction size={32} />
          </div>
        </div>

        {/* TEXTO */}
        <h1 className="text-2xl font-semibold">
          Dashboard en construcción
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400">
          Estamos trabajando para brindarte una mejor experiencia.
          Muy pronto podrás ver el seguimiento de tus peticiones aquí.
        </p>

        {/* ACCIONES */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            <Home size={18} />
            Inicio
          </Link>

          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <User size={18} />
            Mi cuenta
          </Link>
        </div>

        {/* FOOTER MINI */}
        <p className="text-xs text-zinc-500 pt-6">
          Monte Sion · Plataforma en desarrollo
        </p>
      </div>
    </div>
  )
}