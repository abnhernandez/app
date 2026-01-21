"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Evento from "./evento";
import { getSupabaseClient } from "@/lib/supabase";

/* =======================
   Tipos
======================= */

export type EventoItem = {
  id: string;
  fecha: string;
  title: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  tags?: string[];
};

type EventoDbRow = {
  id?: string | number;
  fecha?: string;
  date?: string;
  dia?: string;
  day?: string;
  title?: string;
  titulo?: string;
  nombre?: string;
  subject?: string;
  materia?: string;
  tema?: string;
  teacher?: string;
  maestro?: string;
  profesor?: string;
  start_time?: string;
  hora_inicio?: string;
  inicio?: string;
  end_time?: string;
  hora_fin?: string;
  fin?: string;
  tags?: string[] | null;
  etiquetas?: string[] | null;
};

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

const normalizeEvento = (row: EventoDbRow): EventoItem | null => {
  const fecha = row.fecha ?? row.date ?? row.dia ?? row.day ?? "";
  if (!fecha) return null;

  return {
    id: String(row.id ?? `${fecha}-${row.title ?? row.titulo ?? "evento"}`),
    fecha,
    title: row.title ?? row.titulo ?? row.nombre ?? "Evento",
    subject: row.subject ?? row.materia ?? row.tema ?? "",
    teacher: row.teacher ?? row.maestro ?? row.profesor ?? "",
    startTime: row.start_time ?? row.hora_inicio ?? row.inicio ?? "",
    endTime: row.end_time ?? row.hora_fin ?? row.fin ?? "",
    tags: row.tags ?? row.etiquetas ?? [],
  };
};

const fetcher = async (): Promise<EventoItem[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .order("fecha", { ascending: true });

  if (error) throw error;

  return (data ?? [])
    .map((row: EventoDbRow) => normalizeEvento(row))
    .filter((row: EventoItem | null): row is EventoItem => Boolean(row));
};

export default function CalendarioSemanal({
  eventos,
  titulo = "Calendario Semanal",
  categoria = "GENERAL",
}: Props) {
  const { data: eventosDb, error, isLoading } = useSWR("eventos", fetcher, {
    revalidateOnFocus: false,
  });
  const [mostrarPasados, setMostrarPasados] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const dataSource = eventos ?? eventosDb ?? [];

  const visibles = useMemo(
    () =>
      now
        ? mostrarPasados
          ? dataSource
          : dataSource.filter((e: EventoItem) => !isPastEvent(e, now))
        : dataSource,
    [dataSource, mostrarPasados, now]
  );

  const grupos = useMemo(() => groupByDay(visibles), [visibles]);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-6 bg-background text-foreground">
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
        {isLoading && (
          <p className="text-sm text-muted-foreground">Cargando eventos...</p>
        )}

        {error && !eventosDb && (
          <p className="text-sm text-muted-foreground">
            No se pudieron cargar los eventos.
          </p>
        )}

        {grupos.length === 0 && !isLoading && (
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