import { Users, Heart, Baby } from "lucide-react"

const MINISTRIES = [
  {
    title: "Jóvenes",
    description: "Encuentros, discipulado y comunidad para la nueva generación",
    icon: Users,
  },
  {
    title: "Mujeres",
    description: "Formación, acompañamiento espiritual y comunidad femenina",
    icon: Heart,
  },
  {
    title: "Niños",
    description: "Enseñanza bíblica creativa para los más pequeños",
    icon: Baby,
  },
]

export function MinistriesSection() {
  return (
    <section
      id="ministerios"
      className="mx-auto w-full max-w-6xl px-6 py-16"
      aria-labelledby="titulo-ministerios"
    >
      <div>
        <h2
          id="titulo-ministerios"
          className="font-serif text-3xl font-normal text-foreground sm:text-4xl"
        >
          Ministerios
        </h2>
        <p className="mt-3 text-muted-foreground">
          Espacios para crecer, servir y conectar
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MINISTRIES.map((ministry) => (
          <article
            key={ministry.title}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-accent/10 group-hover:text-accent">
              <ministry.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              {ministry.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {ministry.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
