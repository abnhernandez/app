"use client"

import { useEffect, useState, useTransition } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { getBiblePassage } from "@/lib/bible-actions"

export default function BibliaPage() {
  const [fullscreen, setFullscreen] = useState(false)
  const [text, setText] = useState("")
  const [reference, setReference] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const data = await getBiblePassage({
        passage: "JHN.3",
      })

      setText(data.text)
      setReference(data.reference)
    })
  }, [])

  return (
    <div className={fullscreen ? "fixed inset-0 z-50" : "relative"}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h1 className="font-semibold">
          {reference || "Biblia"}
        </h1>

        <button
          onClick={() => setFullscreen(v => !v)}
          className="p-2 rounded-md hover:opacity-70 transition"
          aria-label="Pantalla completa"
        >
          {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto p-6 leading-relaxed">
        {isPending ? (
          <p className="opacity-60">Cargando pasaje…</p>
        ) : (
          <div>{text}</div>
        )}
      </article>
    </div>
  )
}