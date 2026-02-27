"use client"

import { Users } from "lucide-react"

const speakers = [
  {
    name: "Erick Guzmán Cruz",
    role: "Invitado Especial",
    description:
      "Compartirá su testimonio de vida y las decisiones que marcaron su camino de fe.",
    initial: "E",
  },
  {
    name: "Noemí Trujillo Rogel",
    role: "Invitada Especial",
    description:
      "Junto a Erick, compartirán cómo las decisiones correctas transformaron su historia.",
    initial: "N",
  },
]

export function SpeakersSection() {
  return (
    <section id="invitados" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="size-4 text-primary" />
            <span className="text-xs tracking-[0.35em] uppercase text-primary font-semibold">
              Invitados Especiales
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Conoce a los ponentes
          </h2>

          <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
            Personas reales, historias reales, decisiones reales que marcaron su destino.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">

          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
            >
              {/* Avatar */}
              <div className="mx-auto size-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 transition-all duration-300 group-hover:bg-primary/20">
                <span className="font-serif text-3xl font-bold text-primary">
                  {speaker.initial}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                {speaker.name}
              </h3>

              {/* Role */}
              <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                {speaker.role}
              </p>

              {/* Divider */}
              <div className="mt-6 h-px w-16 mx-auto bg-primary/30 transition-all duration-300 group-hover:w-24" />

              {/* Description */}
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {speaker.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}