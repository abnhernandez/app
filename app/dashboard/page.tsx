import { getDashboardData } from "@/lib/dashboard"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const data = await getDashboardData()

  if (!data) {
    return <p className="p-6">No autenticado</p>
  }

  return (
    <DashboardClient
      profile={data.profile}
    />
  )
}