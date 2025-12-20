import Link from "next/link"
import { getUserRole } from "@/lib/get-user-role"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = await getUserRole()

  return (
    <div className="flex">
      <aside className="w-64 p-4 border-r space-y-2">
        <Link href="/dashboard">Dashboard</Link>

        {/* 🔐 SOLO ADMIN VE EL LINK */}
        {role === "admin" && (
          <Link
            href="/admin"
            className="text-red-600 font-medium"
          >
            Panel Admin
          </Link>
        )}
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}