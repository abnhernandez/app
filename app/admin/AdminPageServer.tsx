import { getAllUsers } from "@/lib/admin-actions"
import { getPeticiones } from "@/lib/peticiones-actions"
import { getNotifications, getUnreadCount } from "@/lib/notifications"
import AdminPageClient from "./AdminPageClient"

export default async function AdminPage() {
  const users = await getAllUsers()
  const peticiones = await getPeticiones()
  const notifications = await getNotifications("admin")
  const unreadCount = await getUnreadCount("admin")

  return (
    <AdminPageClient
      users={users}
      peticiones={peticiones}
      notifications={notifications}
      unreadCount={unreadCount}
    />
  )
}