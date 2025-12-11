"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapaLeaflet({ pos }: { pos: [number, number] }) {
  return (
    <MapContainer
      center={pos}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={pos}>
        <Popup>Ubicación Actual</Popup>
      </Marker>
    </MapContainer>
  );
}