"use client"

import { useState } from "react"
import { updateAccount } from "@/lib/account-actions"
import AvatarUpload from "@/app/components/AvatarUpload"
import DeleteAccountButton from "@/app/components/delete"

export default function AccountForm({ profile }: { profile: any }) {
  const [form, setForm] = useState(profile)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await updateAccount(form)
    setSaving(false)
    alert("Perfil actualizado")
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Nombre"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Bio"
        value={form.bio || ""}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <AvatarUpload />

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>

      <DeleteAccountButton />
    </div>
  )
}