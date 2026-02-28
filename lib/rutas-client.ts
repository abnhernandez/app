import { guardarUbicacionUsuario } from "@/lib/rutas-actions"

export const CHURCH_COORDS = {
  lat: 17.077605,
  lng: -96.762161,
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
  originLat: number
  originLng: number
  departureUnixSeconds?: number
}) {
  return `https://www.google.com/maps/dir/${originLat},${originLng}/${CHURCH_COORDS.lat},${CHURCH_COORDS.lng}/@${ROUTE_MAPS_VIEW.lat},${ROUTE_MAPS_VIEW.lng},${ROUTE_MAPS_VIEW.zoom}z/data=!3m1!4b1!4m6!4m5!2m3!6e0!7e2!8j${departureUnixSeconds}!3e0?${DEFAULT_ROUTE_QUERY_SUFFIX}`
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    })
  })
}

export async function openRouteToChurch() {
  if (!navigator.geolocation) {
    throw new Error("Tu navegador no soporta geolocalización")
  }

  const position = await getCurrentPosition()
  const { latitude, longitude } = position.coords

  await guardarUbicacionUsuario({
    userLat: latitude,
    userLng: longitude,
  })

  const mapsUrl = buildEventDirectionsUrl({
    originLat: latitude,
    originLng: longitude,
  })

  window.open(mapsUrl, "_blank", "noopener,noreferrer")
}