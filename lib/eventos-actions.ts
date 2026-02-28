"use server"
import "server-only"

import { getSupabaseServer } from "@/lib/supabase-server"
import type { EventoDbRow, EventoItem } from "@/lib/eventos-types"

const normalizeEvento = (row: EventoDbRow): EventoItem | null => {
  const fecha = row.fecha ?? row.date ?? row.dia ?? row.day ?? ""
  if (!fecha) return null

  return {
    id: String(row.id ?? `${fecha}-${row.title ?? row.titulo ?? "evento"}`),
    fecha,
    title: row.title ?? row.titulo ?? row.nombre ?? "Evento",
    subject: row.subject ?? row.materia ?? row.tema ?? "",
    teacher: row.teacher ?? row.maestro ?? row.profesor ?? "",
    startTime: row.start_time ?? row.hora_inicio ?? row.inicio ?? "",
    endTime: row.end_time ?? row.hora_fin ?? row.fin ?? "",
    tags: row.tags ?? row.etiquetas ?? [],
  }
}

export async function getEventos(): Promise<EventoItem[]> {
  const supabase = await getSupabaseServer()

  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .order("fecha", { ascending: true })

  if (error) throw error

  return (data ?? [])
    .map((row) => normalizeEvento(row as EventoDbRow))
    .filter((row): row is EventoItem => Boolean(row))
}