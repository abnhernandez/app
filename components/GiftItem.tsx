"use client"

import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function GiftItem({ gift }: { gift: { id: string; title: string; description: string } }) {

  const [name,setName] = useState("")

  async function reserveGift(){

    await supabase
      .from("gift_reservations")
      .insert({
        gift_id: gift.id,
        reserved_by: name
      })

    alert("Regalo reservado 🎁")
  }

  return (
    <div className="border rounded p-3 mt-3">

      <h4 className="font-medium">
        {gift.title}
      </h4>

      <p className="text-sm text-gray-500">
        {gift.description}
      </p>

      <input
        placeholder="Tu nombre"
        className="border p-2 rounded w-full mt-2"
        value={name}
        onChange={e=>setName(e.target.value)}
      />

      <button
        onClick={reserveGift}
        className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
      >
        Reservar regalo
      </button>

    </div>
  )
}