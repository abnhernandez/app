"use client"

import { useState } from "react"
import { guardarUbicacionUsuario } from "@/lib/rutas-actions"

const DESTINO = {
  lat: 17.077605,
  lng: -96.762161,
}

export function RutaTemplo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const guardarUbicacion = () => {
    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude, accuracy } = pos.coords

        // ❌ Ubicación no precisa
        if (accuracy > 50) {
          setError(
            `Ubicación poco precisa (${Math.round(
              accuracy
            )} m). Activa el GPS.`
          )
          setLoading(false)
          return
        }

        // ✅ Guardar en DB
        await guardarUbicacionUsuario({
          userLat: latitude,
          userLng: longitude,
        })

        setLoading(false)

        // 🗺️ ABRIR GOOGLE MAPS CON DIRECCIONES
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${DESTINO.lat},${DESTINO.lng}&travelmode=driving`

        window.open(mapsUrl, "_blank")
      },
      () => {
        setError("Algo falló. Intenta más tarde")
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    )
  }

  return (
    <div className="space-y-3 max-w-md">
      <button
        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
        onClick={guardarUbicacion}
        disabled={loading}
      >
        {loading ? "Preparando ruta..." : "Abrir ruta en Maps"}
      </button>

      {loading && <p className="text-xs text-neutral-500">Redirigiendo a Google Maps</p>}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}