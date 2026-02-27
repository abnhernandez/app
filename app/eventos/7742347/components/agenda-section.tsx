"use client"

import { useState, useMemo } from "react"
import {
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  Mic2,
  Music,
  HandHeart,
  Users,
  MessageCircleHeart,
  Sparkles,
  Coffee,
  LogOut,
  Hand,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* Types */

type EventCategory =
  | "welcome"
  | "prayer"
  | "worship"
  | "presentation"
  | "testimony"
  | "activity"
  | "break"
  | "closing"

interface AgendaEvent {
  id: string
  startTime: string
  endTime: string
  title: string
  host: string
  category: EventCategory
  description?: string
  durationMin: number
}

/* DATA igual que el tuyo */

const EVENTS: AgendaEvent[] = [
  {
    id: "1",
    startTime: "6:00 PM",
    endTime: "6:10 PM",
    title: "Bienvenida / Intro",
    host: "Abner y Aidee",
    category: "welcome",
    description: "Apertura del evento y bienvenida a todos los asistentes",
    durationMin: 10,
  },
  {
    id: "2",
    startTime: "6:10 PM",
    endTime: "6:15 PM",
    title: "Oración",
    host: "Sofia",
    category: "prayer",
    description: "Momento de oración para consagrar el evento",
    durationMin: 5,
  },
  {
    id: "3",
    startTime: "6:15 PM",
    endTime: "6:45 PM",
    title: "Alabanza",
    host: "Daniel",
    category: "worship",
    description: "Tiempo de alabanza y adoración",
    durationMin: 30,
  },
  {
    id: "4",
    startTime: "6:45 PM",
    endTime: "6:50 PM",
    title: "Presentación de invitados",
    host: "Sofia",
    category: "presentation",
    description:
      "Presentación de los hermanos invitados. Invitación a acomodar cada quien las sillas.",
    durationMin: 5,
  },
  {
    id: "5",
    startTime: "6:50 PM",
    endTime: "8:00 PM",
    title: "Testimonio",
    host: "Erick y Noemi",
    category: "testimony",
    description: "Testimonio de los hermanos Erick y Noemi",
    durationMin: 70,
  },
  {
    id: "6",
    startTime: "8:00 PM",
    endTime: "8:10 PM",
    title: "Oración",
    host: "Erick",
    category: "prayer",
    description: "Oración por el hermano Erick",
    durationMin: 10,
  },
  {
    id: "7",
    startTime: "8:10 PM",
    endTime: "8:15 PM",
    title: "Invitación a la dinámica",
    host: "Sofia",
    category: "presentation",
    description: "Introducción y explicación de la dinámica",
    durationMin: 5,
  },
  {
    id: "8",
    startTime: "8:15 PM",
    endTime: "8:30 PM",
    title: "Dinámica",
    host: "Oswaldo y Joselyn",
    category: "activity",
    description: "Actividad dinámica grupal",
    durationMin: 15,
  },
  {
    id: "9",
    startTime: "8:30 PM",
    endTime: "8:32 PM",
    title: "Despedida",
    host: "Sofia",
    category: "closing",
    description: "Palabras de cierre y despedida",
    durationMin: 2,
  },
  {
    id: "10",
    startTime: "8:32 PM",
    endTime: "9:00 PM",
    title: "Refrigerio",
    host: "",
    category: "break",
    description: "Convivencia y refrigerio",
    durationMin: 28,
  },
  {
    id: "11",
    startTime: "9:00 PM",
    endTime: "9:10 PM",
    title: "Cierre",
    host: "",
    category: "closing",
    description: "Cierre oficial del evento",
    durationMin: 10,
  },
]

/* Category Config igual */

const CATEGORY_CONFIG = {
  welcome: { icon: Hand, label: "Bienvenida", color: "text-amber-400" },
  prayer: { icon: HandHeart, label: "Oración", color: "text-sky-400" },
  worship: { icon: Music, label: "Alabanza", color: "text-rose-400" },
  presentation: { icon: Mic2, label: "Presentación", color: "text-violet-400" },
  testimony: { icon: MessageCircleHeart, label: "Testimonio", color: "text-orange-400" },
  activity: { icon: Sparkles, label: "Dinámica", color: "text-emerald-400" },
  break: { icon: Coffee, label: "Refrigerio", color: "text-stone-400" },
  closing: { icon: LogOut, label: "Cierre", color: "text-zinc-400" },
}

export default function Agenda() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const totalDuration = useMemo(
    () => EVENTS.reduce((sum, e) => sum + e.durationMin, 0),
    []
  )

  const participants = useMemo(() => {
    return new Set(
      EVENTS.flatMap((event) =>
        event.host
          .split(" y ")
          .map((name) => name.trim())
          .filter(Boolean)
      )
    ).size
  }, [])

  const hours = Math.floor(totalDuration / 60)
  const mins = totalDuration % 60

  return (
    <div className="min-h-screen bg-[#071a14] text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071a14]/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
            Orden y Propósito
          </p>

          <h1 className="mt-3 font-serif text-2xl md:text-3xl font-semibold tracking-tight">
            Itinerario del Encuentro
          </h1>

          <p className="mt-3 text-sm text-white/60 max-w-xl mx-auto">
            “Hágase todo decentemente y con orden.” — 1 Corintios 14:40
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[380px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Sábado, 28 de febrero</p>
                  <p className="text-sm text-white/60">
                    6:00 PM — 9:10 PM
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-primary" />
                Iglesia Monte Sion
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Stat label="Actividades" value={EVENTS.length} />
              <Stat label="Duración" value={`${hours}h ${mins}m`} />
              <Stat label="Participantes" value={participants} />
            </div>
          </aside>

          {/* Timeline */}
          <section className="space-y-4">
            {EVENTS.map((event) => {
              const config = CATEGORY_CONFIG[event.category as EventCategory]
              const Icon = config.icon
              const isExpanded = expandedId === event.id

              return (
                <div
                  key={event.id}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:-translate-y-1 md:hover:bg-white/10"
                >
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : event.id)
                    }
                    className="w-full px-4 py-5 text-left md:px-6"
                  >
                    <div className="flex items-start gap-3">

                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        config.color
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <Clock className="h-3 w-3" />
                          {event.startTime} — {event.endTime}
                        </div>

                        <h3 className="mt-1 font-semibold md:text-lg">
                          {event.title}
                        </h3>

                        {event.host && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
                            <Users className="h-3 w-3" />
                            {event.host}
                          </div>
                        )}
                      </div>

                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-white/40 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden text-sm text-white/60">
                        {event.description}
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </section>
        </div>
      </main>
    </div>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: string | number | React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </p>
    </div>
  )
}