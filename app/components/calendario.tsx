"use client";

import React, { useEffect, useMemo, useState } from "react";
import Evento from "./evento";
import type { EventoItem } from "@/lib/eventos-types";

/* =======================
   Utilidades
======================= */

const monthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "short",
});

const monthYearFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
});

const isPastEvent = (e: EventoItem, now: Date) => {
  if (!e.endTime) return false;
  const end = new Date(e.fecha);
  const [h, m] = e.endTime.split(":").map(Number);
  end.setHours(h, m, 0, 0);
  return end < now;
};

const getDateKey = (fecha: string) => {
  if (!fecha) return "";
  if (fecha.length >= 10) return fecha.slice(0, 10);
  return new Date(fecha).toISOString().slice(0, 10);
};

const groupByDay = (events: EventoItem[]) => {
  const map = new Map<string, EventoItem[]>();

  for (const ev of events) {
    const key = getDateKey(ev.fecha);
    if (!key) continue;
    (map.get(key) ?? map.set(key, []).get(key)!).push(ev);
  }

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, list]) => ({ day, list }));
};

/* =======================
   Componente
======================= */

type Props = {
  eventos?: EventoItem[];
  titulo?: string;
  categoria?: string;
};

export default function CalendarioSemanal({
  eventos = [],
  titulo = "Calendario",
  categoria = "GENERAL",
}: Props) {
  const [mostrarPasados, setMostrarPasados] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
  }, []);

  const visibles = useMemo(
    () =>
      now
        ? mostrarPasados
          ? eventos
          : eventos.filter((e: EventoItem) => !isPastEvent(e, now))
        : eventos,
    [eventos, mostrarPasados, now]
  );

  const grupos = useMemo(() => groupByDay(visibles), [visibles]);

  return (
    <section className="w-full px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          {titulo}
        </h1>

        <p className="text-muted-foreground capitalize">
          {now ? monthYearFormatter.format(now) : "—"}
        </p>

        <nav className="mt-4 border-b border-border">
          <span className="relative inline-block py-2 text-sm font-semibold text-foreground">
            {categoria}
            <span className="absolute left-0 -bottom-px h-0.5 w-16 bg-yellow-500 dark:bg-yellow-400" />
          </span>
        </nav>
      </header>

      {/* Eventos */}
      <div className="flex flex-col gap-4">
        {grupos.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No hay eventos para mostrar.
          </p>
        )}

        {grupos.map(({ day, list }) => {
          const date = new Date(`${day}T00:00:00`);
          const month = monthFormatter.format(date).toUpperCase();
          const dayNum = date.getDate().toString();

          return (
            <div key={day} className="flex flex-col gap-4">
              {list.map((ev) => (
                <Evento
                  key={ev.id}
                  month={month}
                  day={dayNum}
                  title={ev.title}
                  subject={ev.subject}
                  teacher={ev.teacher}
                  startTime={ev.startTime}
                  endTime={ev.endTime}
                  tags={ev.tags?.map((t) => ({ label: t }))}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-6">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="rounded border-border bg-background text-yellow-500 focus:ring-yellow-500"
            checked={mostrarPasados}
            onChange={(e) => setMostrarPasados(e.target.checked)}
          />
          Mostrar eventos pasados
        </label>
      </footer>
    </section>
  );
}