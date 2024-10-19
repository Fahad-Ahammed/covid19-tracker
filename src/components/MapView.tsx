"use client"

import { FC, useEffect, useState, useCallback } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

// Define the types for your data
type StateCovidData = {
  id: string
  state: string
  coordinates: { lat: number; lng: number }
  summary: {
    total_cases: number
    active_cases: number
    total_recovered: number
    total_deaths: number
  }
}

// Define default center for the map (India)
const defaultCenter: LatLngExpression = [20.5937, 78.9629]

// Function to dynamically set the marker radius based on total cases and zoom level
const getMarkerRadius = (totalCases: number, zoomLevel: number): number => {
  return Math.sqrt(totalCases) / (200 / zoomLevel)
}

// Function to dynamically set marker color based on active cases
const getMarkerColor = (activeCases: number): string => {
  if (activeCases > 50000) return "#ef4444" // Red for high active cases
  if (activeCases > 10000) return "#f59e0b" // Orange for medium active cases
  return "#10b981" // Green for lower active cases
}

// Component to handle zooming to a selected state
const MapZoom: FC<{ coordinates: { lat: number; lng: number } }> = ({ coordinates }) => {
  const map = useMap()

  useEffect(() => {
    if (coordinates) {
      map.flyTo([coordinates.lat, coordinates.lng], 8) // Zoom to state's coordinates
    }
  }, [coordinates, map])

  return null
}

// Component to handle zoom events
const ZoomHandler: FC<{ onZoomChange: (zoom: number) => void }> = ({ onZoomChange }) => {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom())
    },
  })
  return null
}

type MapViewProps = {
  states: StateCovidData[]
  selectedState: StateCovidData | null // Selected state to zoom into
}

const MapView: FC<MapViewProps> = ({ states, selectedState }) => {
  const [zoomLevel, setZoomLevel] = useState(5) // Track zoom level

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoomLevel(newZoom)
  }, [])

  return (
    <MapContainer center={defaultCenter} zoom={5} style={{ height: "100%", width: "100%" }}>
      <ZoomHandler onZoomChange={handleZoomChange} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {states.map((state) => (
        <CircleMarker
          key={state.id}
          center={[state.coordinates.lat, state.coordinates.lng]}
          radius={getMarkerRadius(state.summary.total_cases, zoomLevel)}
          fillOpacity={0.6}
          color={getMarkerColor(state.summary.active_cases)}
          weight={1}
        >
          <Popup>
            <h3>{state.state}</h3>
            <p>Total Cases: {state.summary.total_cases}</p>
            <p>Active Cases: {state.summary.active_cases}</p>
            <p
              className={`${
                state.summary.active_cases > 50000
                  ? "text-[#ef4444]"
                  : state.summary.active_cases > 10000
                  ? "text-[#f59e0b]"
                  : "text-[#10b981]"
              }`}
            >
              Priority:{" "}
              {state.summary.active_cases > 50000
                ? "High"
                : state.summary.active_cases > 10000
                ? "Medium"
                : "Low"}
            </p>
            <p>Recovered: {state.summary.total_recovered}</p>
            <p>Deaths: {state.summary.total_deaths}</p>
          </Popup>
        </CircleMarker>
      ))}
      {selectedState && <MapZoom coordinates={selectedState.coordinates} />}
    </MapContainer>
  )
}

export default MapView