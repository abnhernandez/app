"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CalendarDays, Clock3, MapPin, Timer } from "lucide-react"

/* ===============================
   CONFIGURACIÓN DEL EVENTO
   =============================== */

const EVENT_DATE = new Date(2026, 1, 28) // 28 Feb 2026
const LOCATION = "Iglesia Monte Sion"

type AgendaItem = {
  id: string
  title: string
  speaker?: string | null
  start: string
  end: string
  block: string
  highlight?: boolean
}

const AGENDA_ITEMS: AgendaItem[] = [
  { id: "1", start: "06:00 PM", end: "06:10 PM", title: "Bienvenida / Intro", speaker: "Abner y Aidee", block: "Inicio" },
  { id: "2", start: "06:10 PM", end: "06:15 PM", title: "Oración", speaker: "Sofia", block: "Inicio" },
  { id: "3", start: "06:15 PM", end: "06:45 PM", title: "Alabanza", speaker: "Daniel", block: "Inicio" },
  { id: "4", start: "06:45 PM", end: "06:50 PM", title: "Presentación de invitados", speaker: "Sofia", block: "Inicio" },

  { id: "5", start: "06:50 PM", end: "08:00 PM", title: "Testimonio", speaker: "Erick y Noemí", block: "Momento principal", highlight: true },
  { id: "6", start: "08:00 PM", end: "08:10 PM", title: "Oración", speaker: "Erick", block: "Momento principal" },

  { id: "7", start: "08:10 PM", end: "08:15 PM", title: "Invitación a la dinámica", speaker: "Sofia", block: "Cierre y convivencia" },
  { id: "8", start: "08:15 PM", end: "08:30 PM", title: "Dinámica", speaker: "Oswaldo y Joselyn", block: "Cierre y convivencia" },
  { id: "9", start: "08:30 PM", end: "08:32 PM", title: "Despedida", speaker: "Sofia", block: "Cierre y convivencia" },
  { id: "10", start: "08:32 PM", end: "09:00 PM", title: "Refrigerio", block: "Cierre y convivencia" },
  { id: "11", start: "09:00 PM", end: "09:10 PM", title: "Cierre", block: "Cierre y convivencia" },
]

/* ===============================
   COMPONENTE
   =============================== */

export function AgendaSection() {
  const [now, setNow] = useState(new Date())
  const currentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  function buildDate(time: string) {
    const [hourMinute, period] = time.split(" ")
    let [hours, minutes] = hourMinute.split(":").map(Number)

    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0

    const date = new Date(EVENT_DATE)
    date.setHours(hours, minutes, 0, 0)
    return date
  }

  const enrichedItems = useMemo(() => {
    const mapped = AGENDA_ITEMS.map((item) => {
      const startTime = buildDate(item.start)
      const endTime = buildDate(item.end)

      return {
        ...item,
        startTime,
        endTime,
        isCurrent: now >= startTime && now <= endTime,
        isPast: now > endTime,
        isFuture: now < startTime,
        duration:
          (endTime.getTime() - startTime.getTime()) / 60000,
      }
    })

    return mapped.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime()
    )
  }, [now])

  const blocks = [...new Set(enrichedItems.map((i) => i.block))]

  const eventStart = enrichedItems[0].startTime
  const eventEnd =
    enrichedItems[enrichedItems.length - 1].endTime

  const progress =
    ((now.getTime() - eventStart.getTime()) /
      (eventEnd.getTime() - eventStart.getTime())) *
    100

  useEffect(() => {
    const currentItem = enrichedItems.find((i) => i.isCurrent)
    if (currentItem && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [enrichedItems])

  return (
    <section id="agenda" className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-6">

        {/* Progress */}
        <div className="mb-8 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${Math.min(Math.max(progress, 0), 100)}%`,
            }}
          />
        </div>

        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-serif font-bold">
            Agenda del evento
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            {EVENT_DATE.toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })} · {LOCATION}
          </p>
        </div>

        {/* Info */}
        <div className="mb-12 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
          <Info icon={<CalendarDays size={16} />} text="Evento especial" />
          <Info icon={<MapPin size={16} />} text={LOCATION} />
          <Info icon={<Clock3 size={16} />} text={AGENDA_ITEMS[0].start} />
          <Info
            icon={<Timer size={16} />}
            text={`${Math.round(
              (eventEnd.getTime() - eventStart.getTime()) / 60000
            )} min`}
          />
        </div>

        {/* Timeline */}
        <div className="relative border-l border-border pl-6">

          {blocks.map((block) => (
            <div key={block} className="mb-12">

              <h3 className="mb-6 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {block}
              </h3>

              <div className="space-y-6">
                {enrichedItems
                  .filter((item) => item.block === block)
                  .map((item) => {
                    const stateStyle = item.isCurrent
                      ? "bg-green-500/10 border border-green-500/30 scale-[1.02]"
                      : item.isPast
                      ? "opacity-40"
                      : ""

                    return (
                      <div
                        key={item.id}
                        ref={item.isCurrent ? currentRef : null}
                        className="relative transition-all duration-300"
                      >
                        <span
                          className={`absolute -left-[31px] top-2 size-3 rounded-full border-2 ${
                            item.isCurrent
                              ? "bg-green-500 border-green-500 animate-pulse"
                              : item.highlight
                              ? "bg-primary border-primary"
                              : "bg-background border-border"
                          }`}
                        />

                        <div
                          className={`rounded-xl p-4 transition-all duration-300 hover:bg-muted/40 ${stateStyle}`}
                        >
                          <span className="text-xs text-muted-foreground">
                            {item.start} - {item.end} · ⏱ {item.duration} min
                          </span>

                          <h4
                            className={`mt-1 text-lg font-semibold ${
                              item.highlight ? "text-primary" : ""
                            }`}
                          >
                            {item.title}
                          </h4>

                          {item.speaker && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.speaker}
                            </p>
                          )}

                          {item.isCurrent && (
                            <span className="mt-2 inline-block text-xs font-medium text-green-600">
                              En este momento
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Info({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  )
}