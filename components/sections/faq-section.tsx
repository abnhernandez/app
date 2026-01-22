"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQ_ITEMS = [
  {
    question: "¿Necesito registrarme para asistir?",
    answer:
      "No. Puedes visitarnos libremente en cualquier reunión. Serás bienvenido sin necesidad de registro previo.",
  },
  {
    question: "¿Puedo enviar una petición anónima?",
    answer:
      "Sí. En la página de peticiones puedes enviar tu solicitud de forma anónima. Tu privacidad es importante para nosotros.",
  },
  {
    question: "¿Dónde puedo ver predicaciones?",
    answer:
      "En la sección Estudio encontrarás recursos, predicaciones y material de enseñanza. También tenemos contenido en nuestro canal de YouTube.",
  },
  {
    question: "¿Cómo puedo participar en un ministerio?",
    answer:
      "Visítanos en una reunión y habla con alguno de nuestros líderes. Te orientarán sobre el ministerio que mejor se adapte a tus dones y disponibilidad.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-6xl px-6 py-16"
      aria-labelledby="titulo-faq"
    >
      <div className="text-center">
        <h2
          id="titulo-faq"
          className="font-serif text-3xl font-normal text-foreground sm:text-4xl"
        >
          Preguntas frecuentes
        </h2>
        <p className="mt-3 text-muted-foreground">
          Resolvemos las dudas más comunes
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/30"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-card-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className={cn(
                "grid transition-all duration-200",
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
