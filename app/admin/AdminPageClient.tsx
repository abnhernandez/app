"use client"

import { useState, useCallback } from "react"
import Menu from "@/app/components/menu"
import NotificationCenter from "@/app/components/Notifications"
import AdminUsersTable from "./AdminUsersTable"
import AdminPeticiones from "./AdminPeticiones"
import ExportButtons from "./ExportButtons"

type Props = {
  users: any[]
  peticiones: any[]
  notifications: any[]
  unreadCount: number
}

export default function AdminPageClient({
  users,
  peticiones,
  notifications,
  unreadCount,
}: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const toggleMenu = useCallback(() => setCollapsed((p) => !p), [])

  return (
    <div className="flex min-h-screen">
      <Menu collapsed={collapsed} onToggle={toggleMenu} />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Panel de Administración</h1>
          <div className="inline-flex items-center gap-2">
            <span className="text-sm font-medium">Notificaciones</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <AdminUsersTable users={users} />
            <AdminPeticiones data={peticiones} />
            <ExportButtons />
          </div>

          <div className="xl:col-span-1 sticky top-4">
            <h2 className="mb-3 text-lg font-semibold">Centro de notificaciones</h2>
            <NotificationCenter items={notifications} />
          </div>
        </div>
      </div>
    </div>
  )
}