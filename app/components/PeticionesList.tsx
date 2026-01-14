type Peticion = {
  id: string
  fecha: string
  nombre: string
  peticion: string
  estado: "pendiente" | "orando" | "completada" | "cerrada"
}

function formatFecha(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export default function PeticionesList({ peticiones }: { peticiones: Peticion[] }) {
  return (
    <div className="w-full max-w-sm space-y-4">
      {peticiones.map((p) => (
        <div
          key={p.id}
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>{p.nombre}</span>
            <span>{formatFecha(p.fecha)}</span>
          </div>

          <p className="text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
            {p.peticion}
          </p>

          <div className="mt-3 text-[11px] uppercase tracking-wide font-semibold">
            <span
              className={
                p.estado === "pendiente"
                  ? "text-gray-500"
                  : p.estado === "orando"
                  ? "text-yellow-600"
                  : p.estado === "completada"
                  ? "text-green-600"
                  : "text-blue-600"
              }
            >
              {p.estado}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}