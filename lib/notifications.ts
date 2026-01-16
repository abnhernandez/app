"use server"
import "server-only"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type NotificationTone =
  | "calm"
  | "attention"
  | "action"
  | "progress"
  | "resolved"
  | "alert"

export type NotificationRole = "admin" | "leader" | "intercessor" | "user"

export type NotificationInput = {
  userId: string
  title: string
  message: string
  tone: NotificationTone
  role?: NotificationRole
}

export async function createNotification({
  userId,
  title,
  message,
  tone,
  role = "admin",
}: NotificationInput) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    tone,
    role,
    read: false,
  })
  if (error) throw error
}

export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getUnreadCount(userId: string) {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false)

  if (error) throw error
  return count ?? 0
}

export async function markNotificationRead(id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)

  if (error) throw error
}

export async function auditLog({
  actorId,
  action,
  entity,
  entityId,
  before,
  after,
}: {
  actorId: string
  action: string
  entity: string
  entityId: string
  before?: string
  after?: string
}) {
  const { error } = await supabase.from("audit_logs").insert({
    actor_id: actorId,
    action,
    entity,
    entity_id: entityId,
    before_state: before,
    after_state: after,
  })

  if (error) throw error
}