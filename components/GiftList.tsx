"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
import GiftItem from "@/components/GiftItem"

type Gift = {
  id: string
  title: string
  description: string | null
}

type ReservationRow = {
  gift_id: string
  reserved_by: string
}

export default function GiftList({ birthdayId }: { birthdayId: string }) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [reservationsByGift, setReservationsByGift] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadGiftData() {
      setLoading(true)
      setErrorMessage(null)

      const { data: giftsData, error: giftsError } = await supabase
        .from("gifts")
        .select("id,title,description")
        .eq("birthday_id", birthdayId)
        .order("title", { ascending: true })

      if (giftsError) {
        setErrorMessage("No se pudo cargar la lista de regalos.")
        setLoading(false)
        return
      }

      const parsedGifts = (giftsData ?? []) as Gift[]
      setGifts(parsedGifts)

      if (parsedGifts.length === 0) {
        setReservationsByGift({})
        setLoading(false)
        return
      }

      const giftIds = parsedGifts.map((gift) => gift.id)
      const { data: reservationsData, error: reservationsError } = await supabase
        .from("gift_reservations")
        .select("gift_id,reserved_by")
        .in("gift_id", giftIds)
        .order("created_at", { ascending: true })

      if (reservationsError) {
        setErrorMessage("No se pudo cargar el estado de reservas de regalos.")
        setLoading(false)
        return
      }

      const reservationMap: Record<string, string> = {}
      ;(reservationsData as ReservationRow[] | null)?.forEach((reservation) => {
        if (!reservationMap[reservation.gift_id]) {
          reservationMap[reservation.gift_id] = reservation.reserved_by
        }
      })

      setReservationsByGift(reservationMap)
      setLoading(false)
    }

    loadGiftData()
  }, [birthdayId])

  const hasGifts = useMemo(() => gifts.length > 0, [gifts.length])

  function handleReserved(giftId: string, reservedBy: string) {
    setReservationsByGift((current) => ({ ...current, [giftId]: reservedBy }))
  }

  if (loading) {
    return (
      <div className="mt-8 rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="text-base font-semibold">🎁 Lista de regalos</h3>
        <p className="mt-2 text-sm text-gray-500">Cargando regalos...</p>
      </div>
    )
  }

  return (
    <div className="mt-8 rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold">🎁 Lista de regalos</h3>

      {errorMessage ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}

      {!errorMessage && !hasGifts ? (
        <p className="mt-2 text-sm text-gray-600">Aun no hay regalos sugeridos para este cumpleanos.</p>
      ) : null}

      {!errorMessage
        ? gifts.map((gift) => (
            <GiftItem
              key={gift.id}
              gift={gift}
              reservedBy={reservationsByGift[gift.id] ?? null}
              onReserved={handleReserved}
            />
          ))
        : null}
    </div>
  )
}