import { getAllUsers } from "@/lib/admin-actions"
import { getPeticiones } from "@/lib/peticiones-actions"
import { getUnreadCount } from "@/lib/notifications"
import AdminPageClient from "./AdminPageClient"

export default async function AdminPage() {
  const users = await getAllUsers()
  const peticiones = await getPeticiones()
  const unreadCount = await getUnreadCount("admin")

  return (
    <AdminPageClient
      users={users}
      peticiones={peticiones}
      unreadCount={unreadCount}
    />
  )
}