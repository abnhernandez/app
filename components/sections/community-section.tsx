import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"

const WHATSAPP_GROUPS = [
  {
    name: "Comunidad general",
    description: "Canal principal para enterarte de todo",
    href: "https://chat.whatsapp.com/GC6PocIbE3L9a0YhvzWmWk",
    highlight: false,
  },
  {
    name: "Escogidos",
    description: "Grupo abierto para nuevos; sin permiso de administradores",
    href: "https://chat.whatsapp.com/IDYHs0Q8EWs6Rk7aIwa6nf",
    highlight: true,
  },
  {
    name: "Llamada a la oración",
    description: "Estudio bíblico y oración comunitaria",
    href: "https://chat.whatsapp.com/Lm9bm3fK9PNGHcHNWkavMr",
    highlight: false,
  },
  {
    name: "Jóvenes Monte Sion",
    description: "Grupo general para jóvenes en la fe",
    href: "https://chat.whatsapp.com/DkPavPYXDmJK08qjNc48IJ",
    highlight: false,
  },
]

export function CommunitySection() {
  return (
    <section
      id="comunidad"
      className="mx-auto w-full max-w-6xl px-6 py-16"
      aria-labelledby="titulo-comunidad"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="titulo-comunidad"
            className="font-serif text-3xl font-normal text-foreground sm:text-4xl"
          >
            Comunidad en WhatsApp
          </h2>
          <p className="mt-3 text-muted-foreground">
            Únete al grupo que mejor se adapte a ti
          </p>
        </div>
        <Link
          href="/comunidad"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
        >
          Ver todos los grupos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {WHATSAPP_GROUPS.map((group) => (
          <a
            key={group.name}
            href={group.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-start gap-4 rounded-xl border p-5 transition-all hover:shadow-md ${
              group.highlight
                ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                : "border-border bg-card hover:border-accent/30"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                group.highlight
                  ? "bg-accent/20 text-accent"
                  : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
              }`}
            >
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground">
                {group.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {group.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
