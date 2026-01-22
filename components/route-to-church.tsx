"use client"

import { useState } from "react"
import { MapPin, Navigation, Loader2 } from "lucide-react"

const CHURCH_COORDS = {
  lat: 17.077605,
  lng: -96.762161,
}

export function RouteToChurch() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetRoute = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords

        // Check accuracy
        if (accuracy > 100) {
          setError(
            `Ubicación poco precisa (${Math.round(accuracy)}m). Activa el GPS para mejor precisión.`
          )
          setLoading(false)
          return
        }

        // Open Google Maps with directions
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${CHURCH_COORDS.lat},${CHURCH_COORDS.lng}&travelmode=driving`
        window.open(mapsUrl, "_blank", "noopener,noreferrer")
        setLoading(false)
      },
      (err) => {
        let errorMessage = "No pudimos obtener tu ubicación"
        if (err.code === 1) {
          errorMessage = "Permiso de ubicación denegado"
        } else if (err.code === 2) {
          errorMessage = "Ubicación no disponible"
        } else if (err.code === 3) {
          errorMessage = "Tiempo de espera agotado"
        }
        setError(errorMessage)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    )
  }

  const handleOpenMapsDirectly = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_COORDS.lat},${CHURCH_COORDS.lng}&travelmode=driving`
    window.open(mapsUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleGetRoute}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Obteniendo ruta...
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4" />
              Cómo llegar
            </>
          )}
        </button>

        <button
          onClick={handleOpenMapsDirectly}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <MapPin className="h-4 w-4" />
          Ver en Maps
        </button>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
