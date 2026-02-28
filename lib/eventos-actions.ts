"use server"
import "server-only"

import { getSupabaseServer } from "@/lib/supabase-server"
import type { EventoDbRow, EventoItem } from "@/lib/eventos-types"

const normalizeEvento = (row: EventoDbRow): EventoItem | null => {
  // 🔥 Fuente principal ahora: fecha_evento (TIMESTAMPTZ)
  const fechaBase =
    row.fecha_evento ??
    row.fecha ??
    row.date ??
    row.dia ??
    row.day ??
    null

  if (!fechaBase) return null

  const dateObj = new Date(fechaBase)

  return {
    id: String(
      row.id ??
        `${dateObj.toISOString()}-${row.title ?? row.titulo ?? "evento"}`
    ),

    // 🔥 Siempre devolver ISO real
    fecha: dateObj.toISOString(),

    title: row.title ?? row.titulo ?? row.nombre ?? "Evento",
    subject: row.subject ?? row.materia ?? row.tema ?? "",
    teacher: row.teacher ?? row.maestro ?? row.profesor ?? "",

    // 🔥 Hora formateada correctamente para México
    startTime: dateObj.toLocaleTimeString("es-MX", {
      timeZone: "America/Mexico_City",
      hour: "2-digit",
      minute: "2-digit",
    }),

    endTime: row.end_time ?? row.hora_fin ?? row.fin ?? "",

    tags: row.tags ?? row.etiquetas ?? [],
  }
}

export async function getEventos(): Promise<EventoItem[]> {
  const supabase = await getSupabaseServer()

  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    // 🔥 Ordenar ahora por la columna correcta
    .order("fecha_evento", { ascending: true })

  if (error) {
    console.error("Error obteniendo eventos:", error)
    throw error
  }

  return (data ?? [])
    .map((row) => normalizeEvento(row as EventoDbRow))
    .filter((row): row is EventoItem => Boolean(row))
}
