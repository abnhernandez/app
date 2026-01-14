"use client"

import { useMemo, useState, useTransition } from "react"
import { Search, Eye, X, Trash2, Sparkles } from "lucide-react"
import {
  updateEstadoPeticion,
  deletePeticion,
  generarResumenIA,
} from "@/lib/peticiones-actions"

/* =====================
   TYPES
===================== */
export type EstadoPeticion =
  | "pending"
  | "orando"
  | "info"
  | "completada"
  | "rechazada"

type Peticion = {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  peticion: string
  estado: string
  resumen_ia?: string | null
  created_at_cdmx: string
}

/* =====================
   ESTADOS UI
===================== */
const ESTADOS: Record<
  EstadoPeticion,
  { label: string; color: string }
> = {
  pending: { label: "Pendiente", color: "bg-neutral-100 text-neutral-600" },
  orando: {
    label: "En proceso de oración",
    color: "bg-emerald-100 text-emerald-700",
  },
  info: { label: "En revisión", color: "bg-amber-100 text-amber-700" },
  completada: { label: "Completada", color: "bg-blue-100 text-blue-700" },
  rechazada: { label: "Cerrada", color: "bg-red-100 text-red-700" },
}

/* =====================
   BADGE SEGURO
===================== */
function EstadoBadge({ estado }: { estado: string }) {
  const s =
    ESTADOS[estado as EstadoPeticion] ?? {
      label: estado,
      color: "bg-gray-200 text-gray-700",
    }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.color}`}
    >
      {s.label}
    </span>
  )
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

/* =====================
   MODAL
===================== */
function PeticionModal({
  peticion,
  onClose,
  onUpdate,
  onDelete,
}: {
  peticion: Peticion
  onClose: () => void
  onUpdate: (p: Partial<Peticion>) => void
  onDelete: () => void
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 shadow-xl">
        <header className="flex justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">
              {peticion.nombre} {peticion.apellido}
            </h3>
            <p className="text-sm text-neutral-500">{peticion.email}</p>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        <div className="p-4 space-y-4 text-sm">
          <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
            {peticion.peticion}
          </div>

          {peticion.resumen_ia && (
            <div className="rounded-lg bg-neutral-900 text-white p-3">
              🤖 <strong>Resumen IA:</strong> {peticion.resumen_ia}
            </div>
          )}
        </div>

        <footer className="flex flex-wrap gap-2 justify-between p-4 border-t">
          <select
            value={peticion.estado}
            onChange={(e) => {
              const estado = e.target.value as EstadoPeticion
              startTransition(async () => {
                await updateEstadoPeticion(peticion.id, estado)
                onUpdate({ estado })
              })
            }}
            className="rounded px-3 py-2 text-sm"
          >
            {Object.entries(ESTADOS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() =>
                startTransition(async () => {
                  const resumen = await generarResumenIA(
                    peticion.id,
                    peticion.peticion
                  )
                  onUpdate({ resumen_ia: resumen })
                })
              }
              className="flex items-center gap-1 px-3 py-2 text-sm rounded bg-purple-100"
            >
              <Sparkles size={14} /> Resumen IA
            </button>

            <button
              onClick={() => {
                if (confirm("¿Eliminar definitivamente esta petición?")) {
                  startTransition(async () => {
                    await deletePeticion(peticion.id)
                    onDelete()
                  })
                }
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm rounded bg-red-100"
            >
              <Trash2 size={14} /> Eliminar
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

/* =====================
   MAIN
===================== */
export default function AdminPeticiones({ data }: { data: Peticion[] }) {
  const [items, setItems] = useState(data)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Peticion | null>(null)

  const filtered = useMemo(() => {
    return items.filter((p) =>
      `${p.nombre} ${p.apellido} ${p.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [items, search])

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Peticiones de Oración</h2>
        <input
          placeholder="Buscar..."
          className="border rounded px-3 py-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-sm border rounded">
        <thead className="bg-neutral-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Correo</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Fecha</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">
                {p.nombre} {p.apellido}
              </td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">
                <EstadoBadge estado={p.estado} />
              </td>
              <td className="p-2">{formatFecha(p.created_at_cdmx)}</td>
              <td className="p-2 text-right">
                <button
                  onClick={() => setSelected(p)}
                  className="text-blue-600 flex items-center gap-1"
                >
                  <Eye size={14} /> Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <PeticionModal
          peticion={selected}
          onClose={() => setSelected(null)}
          onUpdate={(patch) =>
            setItems((prev) =>
              prev.map((p) =>
                p.id === selected.id ? { ...p, ...patch } : p
              )
            )
          }
          onDelete={() => {
            setItems((prev) =>
              prev.filter((p) => p.id !== selected.id)
            )
            setSelected(null)
          }}
        />
      )}
    </section>
  )
}