"use client"

import { useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { create } from "zustand"

/* ===============================
   SERVER ACTION
================================ */
async function markReadAction(id: string) {
  const { markNotificationRead } = await import("@/lib/notifications")
  await markNotificationRead(id)
}

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

export type UINotification = {
  id: string
  title: string
  message: string
  created_at: string
  tone: NotificationTone
  read: boolean
}

/* ===============================
   UI META
================================ */
const TONE_META = {
  calm: { gradient: "from-sky-500/10 to-cyan-500/5", dot: "bg-sky-400" },
  attention: { gradient: "from-violet-500/10 to-fuchsia-500/5", dot: "bg-violet-400" },
  action: { gradient: "from-emerald-500/10 to-lime-500/5", dot: "bg-emerald-400" },
  progress: { gradient: "from-blue-500/10 to-indigo-500/5", dot: "bg-blue-400" },
  resolved: { gradient: "from-teal-500/10 to-emerald-500/5", dot: "bg-teal-400" },
  alert: { gradient: "from-red-500/15 to-orange-500/10", dot: "bg-red-400" },
} as const

function relativeTime(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "Ahora"
  if (m < 60) return `Hace ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `Hace ${h} h`
  return new Date(date).toLocaleDateString("es-MX", { day: "2-digit", month: "short" })
}

/* ===============================
   STORE
================================ */
type Store = {
  items: UINotification[]
  add: (n: UINotification) => void
  setAll: (n: UINotification[]) => void
  markRead: (id: string) => void
}

export const useNotificationsStore = create<Store>((set) => ({
  items: [],
  add: (n) => set((s) => ({ items: [n, ...s.items] })),
  setAll: (items = []) => set({ items }),
  markRead: (id) =>
    set((s) => ({
      items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
}))

/* ===============================
   REALTIME + SOUND
================================ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

let audioCtx: AudioContext | null = null

function playSound() {
  if (!audioCtx) audioCtx = new AudioContext()
  if (audioCtx.state === "suspended") audioCtx.resume()

  const o = audioCtx.createOscillator()
  const g = audioCtx.createGain()
  o.frequency.value = 880
  g.gain.value = 0.08
  o.connect(g)
  g.connect(audioCtx.destination)
  o.start()
  o.stop(audioCtx.currentTime + 0.15)
}

function showPush(title: string, body: string) {
  if (Notification.permission === "granted") {
    new Notification(title, { body })
  }
}

/* ===============================
   PROVIDER
================================ */
export function NotificationsProvider() {
  const add = useNotificationsStore((s) => s.add)
  const setAll = useNotificationsStore((s) => s.setAll)

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission()
    }

    supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setAll((data as UINotification[]) || []))

    const channel = supabase
      .channel("realtime-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const notif = payload.new as UINotification
          add(notif)
          playSound()
          showPush(notif.title, notif.message)
        }
      )
      .subscribe()

    const interval = setInterval(() => {
      useNotificationsStore.setState((s) => ({ items: [...s.items] }))
    }, 60_000)

    return () => {
      clearInterval(interval)
      supabase.removeChannel(channel)
    }
  }, [add, setAll])

  return null
}

/* ===============================
   UI
================================ */
function NotificationCard({ n }: { n: UINotification }) {
  const tone = TONE_META[n.tone]
  const markRead = useNotificationsStore((s) => s.markRead)

  async function onClick() {
    if (!n.read) {
      await markReadAction(n.id)
      markRead(n.id)
    }
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer relative flex gap-3 rounded-2xl border border-neutral-800 bg-gradient-to-br ${tone.gradient} px-4 py-3 ${n.read ? "opacity-60" : ""}`}
    >
      <span className={`mt-2 h-2.5 w-2.5 rounded-full ${tone.dot}`} />
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-semibold">{n.title}</h4>
          <span className="text-[11px] text-neutral-500">{relativeTime(n.created_at)}</span>
        </div>
        <p className="text-xs text-neutral-400 line-clamp-2">{n.message}</p>
      </div>
    </div>
  )
}

export default function NotificationCenter({ items = [] }: { items?: UINotification[] }) {
  const storeItems = useNotificationsStore((s) => s.items || [])
  const all = storeItems.length ? storeItems : items

  if (all.length === 0) {
    return <div className="h-40 flex items-center justify-center text-neutral-500">Todo al día ✨</div>
  }

  return (
    <div className="space-y-3">
      {all.map((n) => (
        <NotificationCard key={n.id} n={n} />
      ))}
    </div>
  )
}