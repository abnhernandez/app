import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "María G.",
    role: "Miembro desde 2019",
    text: "Encontré comunidad y dirección para mi vida espiritual. Este lugar transformó mi relación con Dios.",
  },
  {
    name: "Luis R.",
    role: "Miembro desde 2021",
    text: "La enseñanza bíblica me ayudó a fortalecer mi fe y entender mejor el propósito de Dios para mi vida.",
  },
  {
    name: "Ana P.",
    role: "Miembro desde 2020",
    text: "He recibido apoyo y oración en momentos difíciles. Aquí encontré una familia espiritual.",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      className="mx-auto w-full max-w-6xl px-6 py-16"
      aria-labelledby="titulo-testimonios"
    >
      <div className="text-center">
        <h2
          id="titulo-testimonios"
          className="font-serif text-3xl font-normal text-foreground sm:text-4xl"
        >
          Testimonios
        </h2>
        <p className="mt-3 text-muted-foreground">
          Historias reales de fe y restauración
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <article
            key={testimonial.name}
            className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg"
          >
            {/* Quote Icon */}
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Quote className="h-5 w-5" />
            </div>

            {/* Quote Text */}
            <blockquote className="text-base leading-relaxed text-card-foreground">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Author */}
            <footer className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
