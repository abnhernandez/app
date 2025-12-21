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
        className="btn disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === "csv" ? "Exportando..." : "CSV"}
      </button>

      <button
        onClick={downloadXLSX}
        disabled={loading !== null}
        className="btn disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === "xlsx" ? "Exportando..." : "XLSX"}
      </button>
    </div>
  )
}