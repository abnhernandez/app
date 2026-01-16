import NotificationsClient from "@/app/components/NotificationsClient"
import { getUserRole } from "@/lib/get-user-role"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = await getUserRole()

  return (
    <div className="flex min-h-screen">
      <NotificationsClient />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}