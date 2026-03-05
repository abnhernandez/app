"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

interface CakeReservationProps {
  birthdayId: string
}

export default function CakeReservation({ birthdayId }: CakeReservationProps) {

  const [name,setName] = useState("")

  async function reserve() {

    await supabase
      .from("cakes")
      .insert({
        birthday_id: birthdayId,
        reserved_by: name
      })

    alert("Pastel reservado 🎂")
  }

  return (
    <div className="mt-6">

      <h3 className="font-semibold">
        🍰 Pastel
      </h3>

      <input
        className="border p-2 rounded w-full"
        placeholder="Tu nombre"
        value={name}
        onChange={e=>setName(e.target.value)}
      />

      <button
        onClick={reserve}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reservar pastel
      </button>

    </div>
  )
}