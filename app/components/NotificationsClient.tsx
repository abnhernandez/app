"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import Notifications from "./NotificationsView"
import type { NotificationRole } from "./NotificationsView"
import { usePushNotifications } from "@/app/hooks/usePushNotifications"

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NotificationsClient() {
  const [userId, setUserId] = useState<string | null>(null)
  const [role, setRole] = useState<NotificationRole>("user")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return

      const user = data.user
      if (!user) {
        setReady(true)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (!mounted) return
      setUserId(user.id)
      setRole((profile?.role as NotificationRole) ?? "user")
      setReady(true)
    })()

    return () => {
      mounted = false
    }
  }, [])

  usePushNotifications(userId ?? "")

  if (!ready || !userId) return null

  return <Notifications userId={userId} role={role} />
}