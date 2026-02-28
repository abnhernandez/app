"use client"

import { useState } from "react"
import { updateAccount } from "@/lib/account-actions"
import AvatarUpload from "@/app/components/AvatarUpload"
import DeleteAccountButton from "@/app/components/delete"

type ProfileForm = {
  name: string
  bio?: string
  avatar_url?: string | null
}

export default function AccountForm({
  profile,
}: {
  profile: ProfileForm
}) {
  const [form, setForm] = useState<ProfileForm>(() => ({
    name: profile?.name ?? "",
    bio: profile?.bio ?? "",
    avatar_url: profile?.avatar_url ?? null,
  }))

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateAccount(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ================= LEFT: PROFILE CARD ================= */}
      <section className="lg:col-span-1">
        <div className="rounded-2xl p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
          {/* 🔥 AVATAR IG / WHATSAPP */}
          <AvatarUpload
            avatarUrl={form.avatar_url}
            onUpload={(url: string) =>
              setForm((prev) => ({ ...prev, avatar_url: url }))
            }
          />

          <div>
            <h2 className="text-lg font-semibold">
              {form.name || "Sin nombre"}
            </h2>
            <p className="text-sm text-gray-500">
              Perfil público
            </p>
          </div>
        </div>
      </section>

      {/* ================= RIGHT: FORM ================= */}
      <section className="lg:col-span-2">
        <div className="rounded-2xl p-8 shadow-sm space-y-6">
          <h1 className="text-2xl font-semibold">
            Editar perfil
          </h1>

          {/* Nombre */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Nombre
            </label>
            <input
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Tu nombre"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Descríbete en 140 caracteres o menos
            </label>
            <textarea
              maxLength={140}
              rows={4}
              className="w-full rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Bio"
              value={form.bio ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
            />
            <p className="text-xs text-gray-400 text-right">
              {(form.bio?.length ?? 0)}/140
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <DeleteAccountButton />

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}