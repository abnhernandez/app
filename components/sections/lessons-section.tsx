import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LessonCard } from "@/components/lesson-card"

const FEATURED_LESSONS = [
  { title: "¿Quién es Dios?", href: "/lecciones/clase/789207" },
  { title: "¿Cómo buscar a Dios?", href: "/lecciones/clase/790207" },
  { title: "Unción del Espíritu Santo", href: "/lecciones/clase/791207" },
  { title: "¿Cómo honrar a Dios?", href: "/lecciones/clase/792207" },
]

export function LessonsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-normal text-foreground sm:text-4xl">
            Clases destacadas
          </h2>
          <p className="mt-3 text-muted-foreground">
            Aprende y crece en la fe con nuestras lecciones
          </p>
        </div>
        <Link
          href="/lecciones"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
        >
          Ver todas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_LESSONS.map((lesson, index) => (
          <LessonCard
            key={lesson.href}
            title={lesson.title}
            href={lesson.href}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
