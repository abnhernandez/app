import Link from "next/link"
import { HeartHandshake, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 sm:p-12 lg:p-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <defs>
              <pattern
                id="cta-pattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
            <HeartHandshake className="h-7 w-7 text-primary-foreground" />
          </div>

          <h2 className="font-serif text-2xl font-normal text-primary-foreground sm:text-3xl lg:text-4xl text-balance">
            ¿Necesitas oración?
          </h2>

          <p className="mt-4 text-primary-foreground/80">
            Envía tu petición y nuestro equipo orará por ti. Tu solicitud es
            confidencial.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/peticion"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary-foreground/90 hover:shadow-lg"
            >
              Enviar petición
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://wa.me/529512091644?text=Hola.%20Necesito%20de%20Dios."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Contactar por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
