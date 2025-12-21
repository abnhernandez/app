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
      <aside className="w-64 p-4 space-y-2">
        
        {/* 🔐 SOLO ADMIN VE EL LINK */}
        {role === "admin" && (
          <Link
            href="/admin"
            className="p-4 font-bold"
          >
            Panel Admin
          </Link>
        )}
                <Link href="/dashboard">Dashboard</Link>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}