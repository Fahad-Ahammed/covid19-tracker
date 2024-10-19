import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { StateCovidData } from "@/types";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Define default center for the map (India)
const defaultCenter: LatLngExpression = [20.5937, 78.9629];

// Function to dynamically set the marker radius based on total cases and zoom level
const getMarkerRadius = (totalCases: number, zoomLevel: number): number => {
  return Math.sqrt(totalCases) / (200 / zoomLevel); // Ensure it returns a number
};

// Function to dynamically set marker color based on active cases
const getMarkerColor = (activeCases: number): string => {
  if (activeCases > 50000) return "#ef4444"; // Red for high active cases
  if (activeCases > 10000) return "#f59e0b"; // Orange for medium active cases
  return "#10b981"; // Green for lower active cases
};

// Component to handle zooming to a selected state
const MapZoom: FC<{ coordinates: { lat: number; lng: number } }> = ({
  coordinates,
}) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo([coordinates.lat, coordinates.lng], 8); // Zoom to state's coordinates
    }
  }, [coordinates, map]);

  return null;
};

type MapViewProps = {
  states: StateCovidData[];
  selectedState: StateCovidData; // Selected state to zoom into
};

const MapView: FC<MapViewProps> = ({ states, selectedState }) => {
  const [zoomLevel, setZoomLevel] = useState(5); // Track zoom level

  // Handle zoom level change
  const handleZoom = (e: any) => {
    setZoomLevel(e.target.getZoom()); // Track zoom level dynamically
  };

  return (
    <MapContainer
      center={defaultCenter} // Default center on India
      zoom={5} // Default zoom level
      style={{ height: "100%", width: "100%" }}
      whenCreated={(map) => map.on("zoomend", handleZoom)} // Attach zoom event listener
    >
      {/* Tile layer for the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add circle markers for each state's coordinates */}
      {states.map((state) => (
        <CircleMarker
          key={state.id}
          center={[state.coordinates.lat, state.coordinates.lng]} // LatLngExpression for each state
          radius={getMarkerRadius(state.summary.total_cases, zoomLevel)} // Adjust radius based on zoom level
          fillOpacity={0.6}
          color={getMarkerColor(state.summary.active_cases)} // Color based on active cases
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

      {/* Zoom to the selected state */}
      {selectedState && <MapZoom coordinates={selectedState.coordinates} />}
    </MapContainer>
  );
};

export default MapView;
