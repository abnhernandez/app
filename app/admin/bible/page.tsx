"use client"

import { useEffect, useState } from "react"
import { getBiblePassage } from "@/lib/bible-actions"

export default function AdminBibliaPage() {
  const [text, setText] = useState("")
  const [reference, setReference] = useState("")

  useEffect(() => {
    getBiblePassage({ passage: "ROM.12" }).then(data => {
      setText(data.text)
      setReference(data.reference)
    })
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">
        Biblia (Admin)
      </h1>

      <p className="text-sm opacity-60">
        Útil para preparar enseñanzas y avisos.
      </p>

      <div className="border rounded-lg p-4 leading-relaxed">
        <strong>{reference}</strong>
        <div className="mt-2">{text}</div>
      </div>
    </div>
  )
}