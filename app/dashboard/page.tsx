import { getDashboardData } from "@/lib/dashboard"
import DashboardClient from "./DashboardClient"
import { RutaTemplo } from "../components/ruta-templo"

export default async function DashboardPage() {
  const data = await getDashboardData()

  if (!data) {
    return <p className="p-7">No autenticado</p>
  }

  return (
    <>
      <DashboardClient/>
      <RutaTemplo/>
    </>
  )
}