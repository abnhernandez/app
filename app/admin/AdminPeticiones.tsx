"use client"

import { useMemo, useState, useTransition } from "react"
import {
  Search,
  Eye,
  X,
  Trash2,
  Sparkles,
} from "lucide-react"

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
  estado: EstadoPeticion
  resumen_ia?: string | null
  created_at_cdmx: string
}

/* =====================
   ESTADOS UI
===================== */
const ESTADOS = {
  pending: {
    label: "En espera",
    color: "bg-neutral-100 text-neutral-600",
  },
  orando: {
    label: "En oración",
    color: "bg-emerald-100 text-emerald-700",
  },
  info: {
    label: "Requiere info",
    color: "bg-amber-100 text-amber-700",
  },
  completada: {
    label: "Completada",
    color: "bg-blue-100 text-blue-700",
  },
  rechazada: {
    label: "Rechazada",
    color: "bg-red-100 text-red-700",
  },
}

/* =====================
   BADGE
===================== */
function EstadoBadge({ estado }: { estado: EstadoPeticion }) {
  const s = ESTADOS[estado]
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.color}`}>
      {s.label}
    </span>
  )
}

/* =====================
   MODAL / FICHA
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="w-full rounded-2xl shadow-xl bg-neutral-50 dark:bg-neutral-900">
        {/* HEADER */}
        <header className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-lg font-semibold">
              {peticion.nombre} {peticion.apellido}
            </h3>
            <p className="text-sm">
              {peticion.email} · {peticion.telefono}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1"
          >
            <X size={18} />
          </button>
        </header>

        {/* BODY */}
        <div className="p-4 space-y-4 text-sm">
          <div className="rounded-xl p-4 leading-relaxed">
            {peticion.peticion}
          </div>

          {peticion.resumen_ia && (
            <div className="rounded-xl bg-neutral-800 text-neutral-100 p-3">
              🤖 <strong>Resumen IA:</strong> {peticion.resumen_ia}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="flex flex-wrap gap-2 justify-between p-4">
          <div className="flex flex-wrap gap-2">
            <select
              value={peticion.estado}
              onChange={(e) => {
                const estado = e.target.value as EstadoPeticion
                startTransition(async () => {
                  await updateEstadoPeticion(peticion.id, estado)
                  onUpdate({ estado })
                })
              }}
              className="rounded-lg px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-900"
            >
              {Object.entries(ESTADOS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>

            <button
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  const resumen = await generarResumenIA(
                    peticion.id,
                    peticion.peticion
                  )
                  onUpdate({ resumen_ia: resumen })
                })
              }
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <Sparkles size={16} />
              Resumen IA
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm("¿Eliminar esta petición definitivamente?")) {
                startTransition(async () => {
                  await deletePeticion(peticion.id)
                  onDelete()
                })
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-red-400 dark:bg-red-700 px-3 py-2 text-sm hover:bg-red-500 dark:hover:bg-red-800"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
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
    <section className="space-y-7">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold">
          Peticiones de oración
        </h2>

        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3 top-2.5" />
          <input
            placeholder="Buscar por nombre o email"
            className="w-full rounded-xl pl-9 pr-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-neutral-300 dark:bg-neutral-900">
            <tr className="text-left">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="">
                <td className="px-4 py-3 font-medium">
                  {p.nombre} {p.apellido}
                </td>
                <td className="px-4 py-3">{p.email}</td>
                <td className="px-4 py-3">
                  <EstadoBadge estado={p.estado} />
                </td>
                <td className="px-4 py-3">
                  {new Date(p.created_at_cdmx).toLocaleDateString("es-ES")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelected(p)}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs"
                  >
                    <Eye size={14} />
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
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