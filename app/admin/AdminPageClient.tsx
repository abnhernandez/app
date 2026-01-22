"use client"

import { useMemo } from "react"
import NotificationsClient from "@/app/components/NotificationsClient"
import AdminUsersTable from "./AdminUsersTable"
import AdminPeticiones from "./AdminPeticiones"
import ExportButtons from "./ExportButtons"
import type { UserItem } from "./AdminUsersTable"
import type { Peticion } from "./AdminPeticiones"
import Link from "next/link"

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
  const stats = useMemo(() => {
    const totalUsers = users.length
    const admins = users.filter((u) => u.role === "admin").length
    const totalPeticiones = peticiones.length
    const pendientes = peticiones.filter((p) => p.estado === "Pendiente").length

    return {
      totalUsers,
      admins,
      totalPeticiones,
      pendientes,
    }
  }, [users, peticiones])

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Panel de Administración</h1>
            <p className="text-sm text-neutral-500">
              Gestiona usuarios, peticiones y notificaciones desde un solo lugar
            </p>
          </div>
          <ExportButtons />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs text-neutral-500">Usuarios</p>
            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs text-neutral-500">Admins</p>
            <p className="text-2xl font-semibold">{stats.admins}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs text-neutral-500">Peticiones</p>
            <p className="text-2xl font-semibold">{stats.totalPeticiones}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs text-neutral-500">Pendientes</p>
            <p className="text-2xl font-semibold">{stats.pendientes}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/users"
            className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-2 text-xs font-medium"
          >
            Ver usuarios
          </Link>
          <Link
            href="/admin/avisos"
            className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-2 text-xs font-medium"
          >
            Publicar avisos
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-2 text-xs font-medium"
          >
            Ver notificaciones
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5">
              <AdminUsersTable users={users} />
            </section>

            <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5">
              <AdminPeticiones data={peticiones} />
            </section>
          </div>

          <div className="xl:col-span-1 xl:sticky xl:top-4 h-fit">
            <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5">
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-lg font-semibold">Centro de notificaciones</h2>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <NotificationsClient />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}