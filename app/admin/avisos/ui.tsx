"use client"

import {
  createAviso,
  togglePublicarAviso,
  deleteAviso,
} from "@/lib/avisos-actions"
import { useTransition } from "react"

type Aviso = {
  id: string
  titulo: string
  contenido: string
  publicado: boolean
}

export default function AvisosAdminClient({
  avisos,
}: {
  avisos: Aviso[]
}) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="grid gap-8">
      {/* Crear aviso */}
      <form
        action={createAviso}
        className="space-y-4 max-w-lg"
      >
        <input
          name="titulo"
          placeholder="Título del aviso"
          className="w-full p-2 rounded border"
        />
        <textarea
          name="contenido"
          placeholder="Contenido"
          rows={4}
          className="w-full p-2 rounded border"
        />
        <button
          disabled={pending}
          className="px-4 py-2 rounded font-medium border"
        >
          Crear aviso
        </button>
      </form>

      {/* Lista */}
      <div className="space-y-3">
        {avisos.map(a => (
          <div
            key={a.id}
            className="p-4 rounded border flex justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold">{a.titulo}</h3>
              <p className="text-sm opacity-70">
                {a.contenido}
              </p>
              <p className="text-xs opacity-50">
                {a.publicado ? "Publicado" : "Borrador"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  startTransition(() =>
                    togglePublicarAviso(a.id, !a.publicado)
                  )
                }
                className="text-sm underline"
              >
                {a.publicado ? "Despublicar" : "Publicar"}
              </button>

              <button
                onClick={() =>
                  startTransition(() => deleteAviso(a.id))
                }
                className="text-sm text-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}