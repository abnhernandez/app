import Link from "next/link"

const ACTIONS = [
  { label: "Enviar petición", href: "/peticion" },
  { label: "Leer Biblia", href: "/bible" },
  { label: "Aprender a orar", href: "/orar" },
  { label: "Ver eventos", href: "/eventos" },
  { label: "Recursos", href: "/estudio" },
  { label: "Avisos", href: "/avisos" },
]

export function QuickActionsSection() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-8"
      aria-labelledby="titulo-acciones"
    >
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="titulo-acciones"
              className="text-xl font-semibold text-card-foreground"
            >
              Acciones rápidas
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Elige lo que necesitas hoy
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            Ver todo
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-accent/30"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
