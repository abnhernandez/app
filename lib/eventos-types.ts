export type EventoItem = {
  id: string
  fecha: string
  title: string
  subject: string
  teacher: string
  startTime: string
  endTime: string
  tags?: string[]
}

export type EventoDbRow = {
  id?: string | number
  fecha_evento?: string
  fecha?: string
  date?: string
  dia?: string
  day?: string
  title?: string
  titulo?: string
  nombre?: string
  subject?: string
  materia?: string
  tema?: string
  teacher?: string
  maestro?: string
  profesor?: string
  start_time?: string
  hora_inicio?: string
  inicio?: string
  end_time?: string
  hora_fin?: string
  fin?: string
  tags?: string[] | null
  etiquetas?: string[] | null
}