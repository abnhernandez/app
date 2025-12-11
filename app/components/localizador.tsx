"use client";

import { useEffect } from "react";

export default function Localizador() {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("La geolocalización no es soportada.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        console.log("Ubicación:", latitude, longitude);

        // enviar al backend
        await fetch("/api/ubicacion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitud: latitude,
            longitud: longitude,
            nombre: "usuario" // o ID del usuario
          }),
        });
      },
      (err) => {
        console.error("Error obteniendo ubicación:", err);
      },
      {
        enableHighAccuracy: true,  // más precisión
        maximumAge: 0,
        timeout: 5000,
      }
    );

    // limpiar al salir
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>
      <h1>Localizador activo</h1>
      <p>Obteniendo tu ubicación constantemente...</p>
    </div>
  );
}