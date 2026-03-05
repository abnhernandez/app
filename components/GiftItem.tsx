"use client"

import { supabase } from "@/lib/supabase"
import { useState } from "react"

type Gift = {
  id: string
  title: string
  description: string | null
}

interface GiftItemProps {
  gift: Gift
  reservedBy: string | null
  onReserved: (giftId: string, reservedBy: string) => void
}

export default function GiftItem({ gift, reservedBy, onReserved }: GiftItemProps) {
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function reserveGift() {
    const cleanName = name.trim()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!cleanName) {
      setErrorMessage("Escribe tu nombre para reservar este regalo.")
      return
    }

    if (cleanName.length < 2) {
      setErrorMessage("El nombre debe tener al menos 2 caracteres.")
      return
    }

    if (reservedBy) {
      setErrorMessage("Este regalo ya fue reservado.")
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from("gift_reservations")
      .insert({
        gift_id: gift.id,
        reserved_by: cleanName
      })

    setSubmitting(false)

    if (error) {
      setErrorMessage("No se pudo reservar este regalo. Intenta otra vez.")
      return
    }

    onReserved(gift.id, cleanName)
    setName("")
    setSuccessMessage("Regalo reservado con exito.")
  }

  return (
    <div className="mt-3 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-medium">{gift.title}</h4>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            reservedBy ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"
          }`}
        >
          {reservedBy ? "Reservado" : "Disponible"}
        </span>
      </div>

      {gift.description ? <p className="mt-1 text-sm text-gray-500">{gift.description}</p> : null}

      {reservedBy ? (
        <p className="mt-2 text-sm text-gray-700">Reservado por <span className="font-semibold">{reservedBy}</span>.</p>
      ) : (
        <>
          <input
            placeholder="Tu nombre"
            className="mt-3 w-full rounded-lg border p-2"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={reserveGift}
            disabled={submitting}
            className="mt-2 rounded-lg bg-green-600 px-3 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Reservando..." : "Reservar regalo"}
          </button>
        </>
      )}

      {errorMessage ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}
      {successMessage ? <p className="mt-2 text-sm text-emerald-700">{successMessage}</p> : null}
    </div>
  )
}