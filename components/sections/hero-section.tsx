import Link from "next/link"
import { HeartHandshake, MapPin, Calendar, Clock, PlayCircle } from "lucide-react"

const SCHEDULE_ITEMS = [
  {
    label: "Reunión general",
    time: "Domingos 2:30 p.m.",
    location: "Monte Sion · Santa María Atzompa",
  },
  {
    label: "Reunión de oración",
    time: "Viernes 6:00 p.m.",
    location: "Abierta a toda la iglesia",
  },
]

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      aria-labelledby="titulo-inicio"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/50"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-16">
          {/* Content */}
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Iglesia Cristiana Monte Sion
              </span>
            </div>

            {/* Headline */}
            <h1
              id="titulo-inicio"
              className="font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            >
              Bienvenido a casa
            </h1>

            {/* Subheadline */}
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Un lugar para crecer en la fe, recibir apoyo y vivir la Palabra
              con propósito. Únete a nuestra comunidad.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/peticion"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                <HeartHandshake className="h-5 w-5" />
                Enviar petición
              </Link>
              <Link
                href="#visitanos"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <MapPin className="h-5 w-5" />
                Visítanos
              </Link>
              <Link
                href="/avisos"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Calendar className="h-5 w-5" />
                Ver avisos
              </Link>
            </div>
          </div>

          {/* Schedule Cards */}
          <div id="horarios" className="space-y-4">
            {SCHEDULE_ITEMS.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-xl font-semibold text-card-foreground">
                  <Clock className="h-5 w-5 text-accent" />
                  {item.time}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.location}
                </p>
              </article>
            ))}

            {/* Resources Link */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Predicaciones
              </p>
              <Link
                href="/estudio"
                className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-accent/80"
              >
                <PlayCircle className="h-5 w-5" />
                Ver recursos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
