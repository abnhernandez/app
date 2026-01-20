"use client"

import { useState, useCallback } from "react"
import Menu from "@/app/components/menu"
import NotificationsClient from "@/app/components/NotificationsClient"
import AdminUsersTable from "./AdminUsersTable"
import AdminPeticiones from "./AdminPeticiones"
import ExportButtons from "./ExportButtons"
import type { UserItem } from "./AdminUsersTable"
import type { Peticion } from "./AdminPeticiones"

type Props = {
  users: UserItem[]
  peticiones: Peticion[]
  unreadCount: number
}

export default function AdminPageClient({
  users,
  peticiones,
  unreadCount,
}: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const toggleMenu = useCallback(() => setCollapsed((p) => !p), [])

  return (
    <div className="flex min-h-screen">
      <Menu
        collapsed={collapsed}
        onToggle={toggleMenu}
        notificationsCount={unreadCount}
        showNotifications
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Panel de Administración</h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <AdminUsersTable users={users} />
            <AdminPeticiones data={peticiones} />
            <ExportButtons />
          </div>

          <div className="xl:col-span-1 xl:sticky xl:top-4">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Centro de notificaciones</h2>
              {unreadCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <NotificationsClient />
          </div>
        </div>
      </div>
    </div>
  )
}