import { Users, MapPin, Sparkles } from "lucide-react"

const STATS = [
  {
    label: "Comunidad",
    value: "+10 años",
    description: "de servicio continuo",
    icon: Users,
  },
  {
    label: "Ubicación",
    value: "Atzompa",
    description: "Santa María, Oaxaca",
    icon: MapPin,
  },
  {
    label: "Enfoque",
    value: "Discipulado",
    description: "formación integral",
    icon: Sparkles,
  },
]

export function StatsSection() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-6"
      aria-labelledby="titulo-estadisticas"
    >
      <h2 id="titulo-estadisticas" className="sr-only">
        Datos clave de nuestra iglesia
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <article
            key={stat.label}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-card-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stat.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
