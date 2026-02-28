import { getAvisosPublicados } from "@/lib/avisos-actions"
import AvisosClient from "./ui"

export default async function AvisosPage() {
  const avisos = await getAvisosPublicados()

  return <AvisosClient avisos={avisos} />
}