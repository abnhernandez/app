"use client"

import { useTransition } from "react"
import {
  updateUserRole,
  deleteUser,
} from "@/lib/admin-actions"

type User = {
  id: string
  name: string | null
  email: string
  role: "admin" | "user"
  created_at: string
}

export default function AdminUsersTable({
  users,
}: {
  users: User[]
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">
                {u.name ?? "—"}
              </td>
              <td className="p-3">
                {u.email}
              </td>
              <td className="p-3 font-medium">
                {u.role}
              </td>
              <td className="p-3 text-right space-x-2">
                <button
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() =>
                      updateUserRole(
                        u.id,
                        u.role === "admin"
                          ? "user"
                          : "admin"
                      )
                    )
                  }
                  className="px-3 py-1 rounded bg-emerald-500 text-black"
                >
                  Cambiar rol
                </button>

                <button
                  disabled={isPending}
                  onClick={() => {
                    if (
                      confirm(
                        "¿Eliminar usuario definitivamente?"
                      )
                    ) {
                      startTransition(() =>
                        deleteUser(u.id)
                      )
                    }
                  }}
                  className="px-3 py-1 rounded bg-red-600 text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}