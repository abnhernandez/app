import { getAllUsers } from "@/lib/admin-actions"
import AdminUsersTable from "./AdminUsersTable"

export default async function AdminPage() {
  const users = await getAllUsers()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-semibold">
        Panel de Administración
      </h1>

      <AdminUsersTable users={users} />
    </div>
  )
}