import Link from "next/link"
import { Home } from "lucide-react"
import Calendario from "@/app/components/calendario"
import { getEventos } from "@/lib/eventos-actions"

export default async function EventosPage() {
  const eventos = await getEventos()

  return (
    <main className="px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Eventos</h1>
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="inline-flex items-center gap-2 text-sm text-amber-600"
          >
            <Home className="h-4 w-4" /> Inicio
          </Link>
        </header>

        <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-6">
          <Calendario eventos={eventos} />
        </section>
      </div>
    </main>
  )
}