"use client"

import { deleteAccount } from "@/lib/delete-account"

export default function DeleteAccountButton() {
  const handleDelete = async () => {
    const ok = confirm(
      "¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    )
    if (!ok) return

    try {
      await deleteAccount()
      window.location.href = "/"
    } catch (err) {
      alert("Error al eliminar la cuenta")
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Eliminar cuenta
    </button>
  )
}