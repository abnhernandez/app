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
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <header className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Ir al inicio"
              className="inline-flex items-center gap-2 text-sm text-amber-600"
            >
              <Home className="h-4 w-4" /> Inicio
            </Link>
          </header>

          <section className="mt-16 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <BellOff className="h-10 w-10 opacity-50" />
            </div>

            <h1 className="text-2xl font-semibold">Sin avisos por ahora</h1>

            <p className="mt-2 text-sm text-neutral-500">
              Cuando haya avisos importantes, aparecerán aquí.
            </p>
          </section>
        </div>
      </main>
    )
  }

  /* =====================
     HAY AVISOS
  ===================== */
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5" />
            <h1 className="text-xl font-bold">Avisos</h1>
          </div>
          <Link href="/" className="text-sm text-amber-600">Inicio</Link>
        </header>

        <div className="grid gap-4">
          {avisos.map(a => (
            <article
              key={a.id}
              className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-2"
            >
              <h2 className="font-semibold">{a.titulo}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{a.contenido}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}