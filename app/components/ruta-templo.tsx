"use client"

import { useState } from "react"
import { guardarUbicacionUsuario } from "@/lib/rutas-actions"

const DESTINO = {
  lat: 17.077605,
  lng: -96.762161,
}

export function RutaTemplo() {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<{
    lat: number
    lng: number
    accuracy: number
  } | null>(null)
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

        setInfo({
          lat: latitude,
          lng: longitude,
          accuracy,
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
    <div className="space-y-4 max-w-md">
      <button className="btn" onClick={guardarUbicacion}>
        ⛪ Visitar
      </button>

      {loading && <p>Redirigiendo a Maps</p>}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}