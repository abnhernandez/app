import { guardarUbicacionUsuario } from "@/lib/rutas-actions"

export const CHURCH_COORDS = {
  lat: 17.077605,
  lng: -96.762161,
}

type OpenRouteOptions = {
  accuracyThresholdMeters?: number
  saveUserLocation?: boolean
  fallbackToDestinationOnlyOnError?: boolean
  routeDepartureUnixSeconds?: number
}

type OpenRouteResult = {
  openedWithOrigin: boolean
  errorMessage: string | null
}

const ROUTE_MAPS_VIEW = {
  lat: 17.0705996,
  lng: -96.7668136,
  zoom: 15,
}

const DEFAULT_ROUTE_DEPARTURE_UNIX_SECONDS = 1772298000

const DEFAULT_ROUTE_QUERY_SUFFIX =
  "entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"

function buildEventDirectionsUrl({
  originLat,
  originLng,
  departureUnixSeconds = DEFAULT_ROUTE_DEPARTURE_UNIX_SECONDS,
}: {
  originLat?: number
  originLng?: number
  departureUnixSeconds?: number
}) {
  const originSegment =
    typeof originLat === "number" && typeof originLng === "number"
      ? `${originLat},${originLng}`
      : ""

  return `https://www.google.com/maps/dir/${originSegment}/${CHURCH_COORDS.lat},${CHURCH_COORDS.lng}/@${ROUTE_MAPS_VIEW.lat},${ROUTE_MAPS_VIEW.lng},${ROUTE_MAPS_VIEW.zoom}z/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j${departureUnixSeconds}!3e0?${DEFAULT_ROUTE_QUERY_SUFFIX}`
}

export function openDestinationOnlyRoute(
  routeDepartureUnixSeconds = DEFAULT_ROUTE_DEPARTURE_UNIX_SECONDS,
) {
  const mapsUrl = buildEventDirectionsUrl({
    departureUnixSeconds: routeDepartureUnixSeconds,
  })
  window.open(mapsUrl, "_blank", "noopener,noreferrer")
}

function openRouteWithOrigin(
  originLat: number,
  originLng: number,
  routeDepartureUnixSeconds = DEFAULT_ROUTE_DEPARTURE_UNIX_SECONDS,
) {
  const mapsUrl = buildEventDirectionsUrl({
    originLat,
    originLng,
    departureUnixSeconds: routeDepartureUnixSeconds,
  })
  window.open(mapsUrl, "_blank", "noopener,noreferrer")
}

function geolocationErrorMessage(err: GeolocationPositionError) {
  if (err.code === 1) return "Permiso de ubicación denegado"
  if (err.code === 2) return "Ubicación no disponible"
  if (err.code === 3) return "Tiempo de espera agotado"
  return "No pudimos obtener tu ubicación"
}

function getCurrentPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    })
  })
}

export async function openRouteToChurch({
  accuracyThresholdMeters,
  saveUserLocation = false,
  fallbackToDestinationOnlyOnError = true,
  routeDepartureUnixSeconds = DEFAULT_ROUTE_DEPARTURE_UNIX_SECONDS,
}: OpenRouteOptions = {}): Promise<OpenRouteResult> {
  if (!navigator.geolocation) {
    if (fallbackToDestinationOnlyOnError) {
      openDestinationOnlyRoute(routeDepartureUnixSeconds)
      return { openedWithOrigin: false, errorMessage: null }
    }
    return {
      openedWithOrigin: false,
      errorMessage: "Tu navegador no soporta geolocalización",
    }
  }

  try {
    const position = await getCurrentPosition()
    const { latitude, longitude, accuracy } = position.coords

    if (
      typeof accuracyThresholdMeters === "number" &&
      accuracy > accuracyThresholdMeters
    ) {
      return {
        openedWithOrigin: false,
        errorMessage: `Ubicación poco precisa (${Math.round(accuracy)}m). Activa el GPS para mejor precisión.`,
      }
    }

    if (saveUserLocation) {
      try {
        await guardarUbicacionUsuario({
          userLat: latitude,
          userLng: longitude,
        })
      } catch {
        // Si no hay sesión o falla el guardado, mantenemos el flujo de navegación.
      }
    }

    openRouteWithOrigin(latitude, longitude, routeDepartureUnixSeconds)
    return { openedWithOrigin: true, errorMessage: null }
  } catch (error) {
    if (fallbackToDestinationOnlyOnError) {
      openDestinationOnlyRoute(routeDepartureUnixSeconds)
      return { openedWithOrigin: false, errorMessage: null }
    }

    return {
      openedWithOrigin: false,
      errorMessage:
        error instanceof GeolocationPositionError
          ? geolocationErrorMessage(error)
          : "No pudimos obtener tu ubicación",
    }
  }
}