import { getAvisosAdmin } from "@/lib/avisos-actions"
import AvisosAdminClient from "./ui"

export default async function AdminAvisosPage() {
  const avisos = await getAvisosAdmin()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold">Publicar avisos</h1>
        <p className="text-sm opacity-60">
          Crear, editar y publicar avisos visibles para los usuarios
        </p>
      </header>

      <AvisosAdminClient avisos={avisos} />
    </div>
  )
}