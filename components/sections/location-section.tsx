import { MapPin } from "lucide-react"
import { RouteToChurch } from "@/components/route-to-church"

export function LocationSection() {
  return (
    <section
      id="visitanos"
      className="mx-auto w-full max-w-6xl px-6 py-8"
      aria-labelledby="titulo-visitanos"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid lg:grid-cols-[1fr_auto]">
          {/* Content */}
          <div className="p-6 lg:p-8">
            <h3
              id="titulo-visitanos"
              className="font-serif text-2xl font-normal text-card-foreground"
            >
              Visítanos
            </h3>
            <address className="mt-4 space-y-2 not-italic">
              <p className="text-muted-foreground">
                Cuicatlán 184, Col. Niños Héroes
              </p>
              <p className="text-muted-foreground">
                Santa María Atzompa, Oaxaca
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Oaxaca de Juárez, México
              </div>
            </address>

            <div className="mt-6">
              <RouteToChurch />
            </div>
          </div>

          {/* Map Placeholder / Decorative */}
          <div className="hidden h-full min-h-[200px] w-[300px] bg-gradient-to-br from-muted via-muted to-accent/5 lg:block">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-accent/30" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Santa María Atzompa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
