"use client"

import { MapPin, CalendarDays } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-3 md:items-start">

          {/* Brand / Event */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
              Evento Juvenil 2026
            </p>

            <h3 className="font-serif text-2xl font-semibold text-foreground leading-snug">
              Las decisiones más importantes de tu vida
            </h3>

            <p className="mt-4 text-sm text-muted-foreground">
              Un tiempo diseñado para reflexionar, conectar y tomar decisiones que marcarán tu futuro.
            </p>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Información
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <CalendarDays className="size-4 text-primary" />
                28 de Febrero · 6:00 PM
              </div>

              <div className="flex items-start gap-2 text-foreground">
                <MapPin className="size-4 text-primary mt-0.5" />
                <span>
                  Iglesia Cristiana Monte Sion <br />
                  Oaxaca de Juárez, Oaxaca
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Ubicación
            </h4>

            <a
              href="https://maps.app.goo.gl/dpToTNDtef24EMhF6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
            >
              <MapPin className="size-4" />
              Ver en Google Maps
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Iglesia Cristiana Monte Sion. Todos los derechos reservados.
          </p>

          <p className="tracking-wide">
            Diseñado para la comunidad juvenil
          </p>
        </div>

      </div>
    </footer>
  )
}