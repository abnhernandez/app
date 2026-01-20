"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createClient } from "@supabase/supabase-js"

/* ===============================
   SUPABASE CLIENT
================================ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* ===============================
   TYPES
================================ */
export type NotificationTone =
  | "calm"
  | "attention"
  | "action"
  | "progress"
  | "resolved"
  | "alert"

export type NotificationRole =
  | "admin"
  | "leader"
  | "intercessor"
  | "user"

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  tone: NotificationTone
  role: NotificationRole
  read: boolean
  created_at: string
}

/* ===============================
   DATA HELPERS
================================ */
async function getNotificationsPage({
  userId,
  role,
  cursor,
  limit = 20,
}: {
  userId: string
  role: NotificationRole
  cursor?: string
  limit?: number
}) {
  let q = supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .lte("role", role)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (cursor) q = q.lt("created_at", cursor)

  const { data, error } = await q
  if (error) throw error

  return {
    items: (data ?? []) as Notification[],
    nextCursor: data?.at(-1)?.created_at,
  }
}

async function getUnreadCount(userId: string) {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false)

  if (error) throw error

  return count ?? 0
}

async function markNotificationRead(id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)
    .eq("read", false)

  if (error) throw error
}

async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("silent_notifications")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") throw error

  return data ?? { silent_notifications: false }
}

/* ===============================
   GROUP BY DAY
================================ */
function groupByDay(items: Notification[]) {
  const groups: Record<string, Notification[]> = {}

  for (const n of items) {
    const d = new Date(n.created_at)
    const key =
      d.toDateString() === new Date().toDateString()
        ? "Hoy"
        : d.toDateString() ===
          new Date(Date.now() - 86400000).toDateString()
        ? "Ayer"
        : d.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
          })

    groups[key] ||= []
    groups[key].push(n)
  }

  return groups
}

function formatTime(value: string) {
  const d = new Date(value)
  return d.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

/* ===============================
   COMPONENT
================================ */
export function Notifications({
  userId,
  role,
}: {
  userId: string
  role: NotificationRole
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<Notification[]>([])
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [unread, setUnread] = useState(0)
  const [silent, setSilent] = useState(false)

  /* ===============================
     INITIAL LOAD (STREAMING SAFE)
  ================================ */
  useEffect(() => {
    let active = true
    ;(async () => {
      const [{ items: nextItems, nextCursor }, nextUnread, prefs] =
        await Promise.all([
          getNotificationsPage({ userId, role }),
          getUnreadCount(userId),
          getUserPreferences(userId),
        ])

      if (!active) return
      setItems(nextItems)
      setCursor(nextCursor)
      setUnread(nextUnread)
      setSilent(prefs.silent_notifications)
    })()

    return () => {
      active = false
    }
  }, [userId, role])

  /* ===============================
     INFINITE SCROLL
  ================================ */
  useEffect(() => {
    if (!ref.current || !cursor) return

    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting || !cursor) return

      const { items: nextItems, nextCursor } =
        await getNotificationsPage({
          userId,
          role,
          cursor,
        })

      setItems((prev) => [...prev, ...nextItems])
      setCursor(nextCursor)
    })

    io.observe(ref.current)
    return () => io.disconnect()
  }, [cursor, userId, role])

  /* ===============================
     REALTIME (INSERT + UPDATE)
  ================================ */
  useEffect(() => {
    const ch = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        ({ new: n }) => {
          if (silent) return
          setItems((prev) => [n as Notification, ...prev])
          setUnread((prev) => prev + 1)
          new Notification(n.title, { body: n.message })
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        ({ new: n }) => {
          if (n.read) {
            setUnread((prev) => Math.max(0, prev - 1))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(ch)
    }
  }, [silent, userId])

  /* ===============================
     GROUPED VIEW
  ================================ */
  const grouped = useMemo(() => groupByDay(items), [items])

  const handleRead = (id: string) => {
    let wasUnread = false
    setItems((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n
        wasUnread = !n.read
        return { ...n, read: true }
      })
    )
    if (wasUnread) setUnread((prev) => Math.max(0, prev - 1))
    void markNotificationRead(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-neutral-500">
          Notificaciones
        </div>
        {unread > 0 && (
          <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            {unread}
          </span>
        )}
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-sm text-neutral-400">
          No tienes notificaciones todavía.
        </div>
      )}

      {Object.entries(grouped).map(([day, items]) => (
        <section key={day}>
          <h3 className="text-xs uppercase text-neutral-500 mb-2 tracking-wide">
            {day}
          </h3>

          <div className="space-y-2">
            {items.map((n) => (
              <div
                key={n.id}
                onClick={() => handleRead(n.id)}
                className={`rounded-2xl border px-4 py-3 transition cursor-pointer group ${
                  n.read
                    ? "border-neutral-800/60 bg-neutral-900/30 opacity-70"
                    : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold text-white">
                    {n.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                    <span>{formatTime(n.created_at)}</span>
                  </div>
                </div>
                <div className="mt-1 text-xs text-neutral-400">
                  {n.message}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div ref={ref} />
    </div>
  )
}

export default Notifications