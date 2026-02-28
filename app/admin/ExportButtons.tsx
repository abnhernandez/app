"use client"

import { useState } from "react"
import { exportCSV, exportXLSX } from "@/lib/export-actions"

export default function ExportButtons() {
  const [loading, setLoading] = useState<"csv" | "xlsx" | null>(null)

  // ✅ Fecha en zona horaria America/Mexico_City
  const getDate = () => {
    return new Intl.DateTimeFormat("sv-SE", {
      timeZone: "America/Mexico_City",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date())
  }

  const downloadCSV = async () => {
    try {
      setLoading("csv")

      const csv = await exportCSV()
      const blob = new Blob([csv], { type: "text/csv" })

      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = `peticiones_${getDate()}.csv`
      a.click()
      URL.revokeObjectURL(a.href)
    } finally {
      setLoading(null)
    }
  }

  const downloadXLSX = async () => {
    try {
      setLoading("xlsx")

      const data = await exportXLSX()
      const blob = new Blob([new Uint8Array(data)], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })

      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = `peticiones_${getDate()}.xlsx`
      a.click()
      URL.revokeObjectURL(a.href)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={downloadCSV}
        disabled={loading !== null}
        className="relative inline-flex items-center justify-center gap-2
                   rounded-full px-5 py-2.5 text-sm font-medium
                   text-neutral-900 dark:text-white
                   bg-white/60 dark:bg-neutral-900/60
                   backdrop-blur-xl
                   border border-white/40 dark:border-neutral-700/50
                   shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                   hover:bg-white/80 dark:hover:bg-neutral-900/80
                   hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                   active:scale-[0.97]
                   transition-all duration-300 ease-out
                   focus:outline-none focus:ring-2 focus:ring-neutral-400/40
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading === "csv" ? "Exportando..." : "CSV"}
      </button>

      <button
        onClick={downloadXLSX}
        disabled={loading !== null}
        className="relative inline-flex items-center justify-center gap-2
                   rounded-full px-5 py-2.5 text-sm font-medium
                   text-neutral-900 dark:text-white
                   bg-white/60 dark:bg-neutral-900/60
                   backdrop-blur-xl
                   border border-white/40 dark:border-neutral-700/50
                   shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                   hover:bg-white/80 dark:hover:bg-neutral-900/80
                   hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                   active:scale-[0.97]
                   transition-all duration-300 ease-out
                   focus:outline-none focus:ring-2 focus:ring-neutral-400/40
                   disabled:opacity-40 disabled:cursor-not-allowed"      >
        {loading === "xlsx" ? "Exportando..." : "XLSX"}
      </button>
    </div>
  )
}