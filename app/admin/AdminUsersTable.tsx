"use client"

import { useMemo, useState, useTransition } from "react"
import { updateUserRole, deleteUser } from "@/lib/admin-actions"
import {
  Shield,
  User,
  Trash2,
  Search,
} from "lucide-react"

/* =====================
   TYPES
===================== */
type Role = "admin" | "user"

export type UserItem = {
  id: string
  name: string | null
  email: string
  role: Role
  created_at: string
}

/* =====================
   UI HELPERS
===================== */
function Badge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium
      ${
        role === "admin"
          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
          : "bg-neutral-100 text-neutral-700 dark:bg-neutral-700/40 dark:text-neutral-300"
      }`}
    >
      {role === "admin" ? <Shield size={12} /> : <User size={12} />}
      {role}
    </span>
  )
}

/* =====================
   CONFIRM MODAL
===================== */
function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirmar",
  destructive,
  onConfirm,
  onClose,
  loading,
}: {
  open: boolean
  title: string
  description: string
  confirmText?: string
  destructive?: boolean
  loading?: boolean
  onConfirm: () => void
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-neutral-500">{description}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white
              ${
                destructive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
              disabled:opacity-50`}
          >
            {loading ? "Procesando…" : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

/* =====================
   TOAST
===================== */
function Toast({ message, type }: { message: string; type: "ok" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm text-white shadow-lg
      ${type === "ok" ? "bg-emerald-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  )
}

/* =====================
   MAIN
===================== */
export default function AdminUsersTable({ users = [] }: { users?: UserItem[] }) {
  const [data, setData] = useState<UserItem[]>(users)
  const [isPending, startTransition] = useTransition()

  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all")
  const [page, setPage] = useState(1)
  const perPage = 6

  const [toast, setToast] = useState<null | { msg: string; type: "ok" | "error" }>(null)

  const [confirm, setConfirm] = useState<null | {
    action: "delete" | "role"
    user: UserItem
  }>(null)

  /* =====================
     FILTERS
  ===================== */
  const filtered = useMemo(() => {
    return data.filter((u) => {
      const matchQuery =
        u.name?.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())

      const matchRole = roleFilter === "all" || u.role === roleFilter

      return matchQuery && matchRole
    })
  }, [data, query, roleFilter])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  /* =====================
     ACTIONS (OPTIMISTIC)
  ===================== */
  const confirmDelete = (user: UserItem) =>
    setConfirm({ action: "delete", user })

  const confirmRole = (user: UserItem) =>
    setConfirm({ action: "role", user })

  const runConfirm = () => {
    if (!confirm) return

    const { user, action } = confirm
    setConfirm(null)

    if (action === "delete") {
      const prev = data
      setData((d) => d.filter((u) => u.id !== user.id))

      startTransition(async () => {
        try {
          await deleteUser(user.id)
          setToast({ msg: "Usuario eliminado", type: "ok" })
        } catch {
          setData(prev)
          setToast({ msg: "Error al eliminar usuario", type: "error" })
        }
      })
    }

    if (action === "role") {
      const prev = data
      const nextRole: Role = user.role === "admin" ? "user" : "admin"

      setData((d) =>
        d.map((u) =>
          u.id === user.id ? { ...u, role: nextRole } : u
        )
      )

      startTransition(async () => {
        try {
          await updateUserRole(user.id, nextRole)
          setToast({ msg: "Rol actualizado", type: "ok" })
        } catch {
          setData(prev)
          setToast({ msg: "Error al cambiar rol", type: "error" })
        }
      })
    }
  }

  /* =====================
     RENDER
  ===================== */
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Gestión de Identidad y Accesos</h2>
        <p className="text-sm text-neutral-500">Administra roles y accesos de usuarios</p>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 text-neutral-400" size={16} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Buscar por nombre o email"
            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pl-9 pr-3 py-2 text-sm"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value as "all" | Role)
            setPage(1)
          }}
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">Todos</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>
      </div>

      {/* USERS */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>
          Mostrando {paginated.length} de {filtered.length}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginated.map((u) => (
          <div
            key={u.id}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <div className="space-y-1">
              <p className="font-medium">{u.name ?? "—"}</p>
              <p className="text-sm text-neutral-500 break-all">{u.email}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Badge role={u.role} />

              <div className="flex gap-2">
                <button
                  onClick={() => confirmRole(u)}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs"
                >
                  Cambiar rol
                </button>
                <button
                  onClick={() => confirmDelete(u)}
                  className="rounded-lg border border-red-200 dark:border-red-800/40 px-3 py-1 text-xs text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-8 w-8 rounded-full text-sm
                ${
                  page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "border border-neutral-200 dark:border-neutral-800"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* MODAL */}
      <ConfirmModal
        open={!!confirm}
        title={
          confirm?.action === "delete"
            ? "Eliminar usuario"
            : "Cambiar rol"
        }
        description={
          confirm?.action === "delete"
            ? "Esta acción no se puede deshacer."
            : "¿Deseas cambiar el rol de este usuario?"
        }
        destructive={confirm?.action === "delete"}
        confirmText={
          confirm?.action === "delete" ? "Eliminar" : "Cambiar"
        }
        onConfirm={runConfirm}
        onClose={() => setConfirm(null)}
        loading={isPending}
      />

      {/* TOAST */}
      {toast && (
        <Toast message={toast.msg} type={toast.type} />
      )}
    </div>
  )
}