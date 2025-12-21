"use client"

import Link from "next/link"
import { Home, BellOff, Bell } from "lucide-react"

type Aviso = {
  id: string
  titulo: string
  contenido: string
}

export default function AvisosClient({
  avisos,
}: {
  avisos: Aviso[]
}) {
  /* =====================
     NO HAY AVISOS
  ===================== */
  if (!avisos || avisos.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <section className="max-w-md w-full text-center">
          {/* Inicio */}
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="fixed top-4 right-4 md:left-4 md:right-auto z-50 inline-flex items-center p-2 rounded-md hover:opacity-80 transition"
          >
            <Home className="h-5 w-5" />
          </Link>

          {/* Icono */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <BellOff className="h-10 w-10 opacity-50" />
          </div>

          <h1 className="text-2xl font-semibold">
            Sin avisos por ahora
          </h1>

          <p className="mt-2 opacity-60">
            Cuando haya notificaciones importantes, aparecerán aquí.
          </p>
        </section>
      </main>
    )
  }

  /* =====================
     HAY AVISOS
  ===================== */
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center gap-3">
        <Bell className="h-5 w-5" />
        <h1 className="text-xl font-bold">Avisos</h1>
      </header>

      <div className="space-y-4">
        {avisos.map(a => (
          <article
            key={a.id}
            className="p-4 rounded-lg border space-y-2"
          >
            <h2 className="font-semibold">
              {a.titulo}
            </h2>
            <p className="text-sm opacity-80">
              {a.contenido}
            </p>
          </article>
        ))}
      </div>
    </main>
  )
}