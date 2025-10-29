import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  coordinates?: { lat: number; lng: number } | null;
  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      lat: number | null;
      lng: number | null;
    }>
  >;
};

const MapPicker = ({ setCoordinates, coordinates }: Props) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    coordinates || null
  );

  // *  handle map click
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        setCoordinates({ lat, lng });
      },
    });
    return position ? (
      <Marker position={[position.lat, position.lng]} icon={markerIcon} />
    ) : null;
  };

  // * check
  const center = position ? [position.lat, position.lng] : [-26.2041, 28.0473];

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden ">
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
