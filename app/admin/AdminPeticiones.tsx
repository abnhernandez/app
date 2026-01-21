"use client"

import { useMemo, useState, useTransition } from "react"
import { Search, Eye, X, Trash2, Sparkles, Lock } from "lucide-react"

import {
  updateEstadoPeticion,
  deletePeticion,
  generarResumenIA,
  getPeticionDescifrada,
  type EstadoPeticion,
} from "@/lib/peticiones-actions"

/* ================= TYPES ================= */

export type Peticion = {
  id: string
  nombre?: string | null
  email?: string | null
  estado?: EstadoPeticion | null
  resumen_ia?: string | null
  created_at?: string | null
}

/* ================= UI HELPERS ================= */

const ESTADOS: Record<EstadoPeticion, { label: string; color: string }> = {
  Recibida: { label: "Recibida", color: "bg-sky-500/10 text-sky-400" },
  Pendiente: { label: "Pendiente", color: "bg-yellow-500/10 text-yellow-400" },
  "En proceso de oración": { label: "En proceso de oración", color: "bg-blue-500/10 text-blue-400" },
  Completada: { label: "Completada", color: "bg-green-500/10 text-green-400" },
  Cerrada: { label: "Cerrada", color: "bg-red-500/10 text-red-400" },
  Resuelta: { label: "Resuelta", color: "bg-emerald-500/10 text-emerald-400" },
}

function EstadoBadge({ estado }: { estado?: EstadoPeticion | null }) {
  const s = estado ? ESTADOS[estado] : null
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s?.color ?? "bg-neutral-800 text-neutral-400"}`}>
      {s?.label ?? "—"}
    </span>
  )
}

/* ================= MODAL ================= */

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
  const [texto, setTexto] = useState<string | null>(null)
  const [loadingTexto, setLoadingTexto] = useState(false)

  const puedeResumir = texto && texto.trim().length >= 10

  async function handleDecrypt() {
    setLoadingTexto(true)
    try {
      const plain = await getPeticionDescifrada(peticion.id)
      setTexto(plain)
    } finally {
      setLoadingTexto(false)
    }
  }

  const fullName =
    peticion.nombre?.trim() || "Petición anónima"

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl">
        <header className="flex justify-between p-4 border-b border-neutral-800">
          <div>
            <h3 className="font-semibold">{fullName}</h3>
            {peticion.email && <p className="text-sm text-neutral-400">{peticion.email}</p>}
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        <div className="p-4 space-y-4 text-sm">
          {!texto ? (
            <button
              onClick={handleDecrypt}
              disabled={loadingTexto}
              className="w-full flex items-center justify-center gap-2 border border-neutral-700 rounded-lg py-4 text-neutral-300"
            >
              <Lock size={16} />
              {loadingTexto ? "Leyendo petición..." : "Mostrar contenido"}
            </button>
          ) : (
            <div className="bg-neutral-900 rounded-lg p-4 leading-relaxed">
              {texto}
            </div>
          )}

          {peticion.resumen_ia && (
            <div className="bg-indigo-500/10 rounded-lg p-3">
              🤖 <strong>Resumen IA:</strong> {peticion.resumen_ia}
            </div>
          )}
        </div>

        <footer className="flex justify-between p-4 border-t border-neutral-800">
          <select
            value={peticion.estado ?? "Recibida"}
            onChange={(e) =>
              startTransition(async () => {
                const estado = e.target.value as EstadoPeticion
                await updateEstadoPeticion(peticion.id, estado)
                onUpdate({ estado })
              })
            }
            className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm"
          >
            {Object.entries(ESTADOS).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              disabled={!puedeResumir || isPending}
              onClick={() =>
                startTransition(async () => {
                  if (!texto) return
                  const resumen = await generarResumenIA(peticion.id, texto)
                  onUpdate({ resumen_ia: resumen })
                })
              }
              className="flex gap-1 px-3 py-2 text-sm border border-neutral-700 rounded disabled:opacity-40"
            >
              <Sparkles size={14} />
              Resumir
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
              className="flex gap-1 px-3 py-2 text-sm text-red-400 border border-red-800/40 rounded"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

/* ================= MAIN ================= */

export default function AdminPeticiones({ data = [] }: { data?: Peticion[] }) {
  const [items, setItems] = useState<Peticion[]>(data)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Peticion | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items

    return items.filter((p) =>
      `${p.nombre ?? ""} ${p.email ?? ""}`.toLowerCase().includes(q)
    )
  }, [items, search])

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Peticiones de Oración</h2>
        <div className="relative">
          <Search size={16} className="absolute left-2 top-2.5 text-neutral-500" />
          <input
            placeholder="Buscar por nombre o email"
            className="pl-8 bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="h-40 flex items-center justify-center text-neutral-500">
          No hay peticiones
        </div>
      )}

      {filtered.map((p) => {
        const fullName =
          p.nombre?.trim() || "Petición anónima"

        return (
          <div
            key={p.id}
            className="flex justify-between items-center bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3"
          >
            <div>
              <p className="font-medium">{fullName}</p>
              {p.email && <p className="text-xs text-neutral-500">{p.email}</p>}
            </div>

            <div className="flex items-center gap-4">
              <EstadoBadge estado={p.estado} />
              <button
                onClick={() => setSelected(p)}
                className="text-blue-400 flex gap-1 items-center"
              >
                <Eye size={14} /> Abrir
              </button>
            </div>
          </div>
        )
      })}

      {selected && (
        <PeticionModal
          peticion={selected}
          onClose={() => setSelected(null)}
          onUpdate={(patch) => {
            setItems((prev) =>
              prev.map((p) => (p.id === selected.id ? { ...p, ...patch } : p))
            )
            setSelected((s) => (s ? { ...s, ...patch } : s))
          }}
          onDelete={() => {
            setItems((prev) => prev.filter((p) => p.id !== selected.id))
            setSelected(null)
          }}
        />
      )}
    </section>
  )
}