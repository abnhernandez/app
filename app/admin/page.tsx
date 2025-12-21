import { getAllUsers } from "@/lib/admin-actions"
import { getPeticiones } from "@/lib/peticiones-actions"
import AdminUsersTable from "./AdminUsersTable"
import AdminPeticiones from "./AdminPeticiones"
import ExportButtons from "./ExportButtons"

export default async function AdminPage() {
  const users = await getAllUsers()
  const peticiones = await getPeticiones()

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-semibold">
        Panel de Administración
      </h1>

      <AdminUsersTable users={users} />

      <ExportButtons />

      <AdminPeticiones data={peticiones} />
    </div>
  )
}