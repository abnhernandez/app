import { BookOpen, MessageSquare, Calendar, Bell } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"

const FEATURES = [
  {
    title: "Biblia",
    description: "Lee y medita en la Palabra de Dios",
    href: "/bible",
    icon: BookOpen,
  },
  {
    title: "Cómo orar",
    description: "Guía práctica para fortalecer tu oración",
    href: "/orar",
    icon: MessageSquare,
  },
  {
    title: "Eventos",
    description: "Agenda semanal y próximos encuentros",
    href: "/eventos",
    icon: Calendar,
  },
  {
    title: "Avisos",
    description: "Información y comunicados importantes",
    href: "/avisos",
    icon: Bell,
  },
]

export function FeaturesSection() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-12"
      aria-labelledby="titulo-recursos"
    >
      <h2 id="titulo-recursos" className="sr-only">
        Recursos principales
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            href={feature.href}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  )
}
