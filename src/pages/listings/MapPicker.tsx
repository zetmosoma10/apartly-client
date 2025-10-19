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
  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      latitude: number | null;
      longitude: number | null;
    }>
  >;
};

function LocationMarker({ setCoordinates }: Props) {
  const [position, setPosition] = useState<[number, number]>();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setCoordinates({ latitude: lat, longitude: lng });
    },
  });

  return position ? (
    <Marker position={position} icon={markerIcon}></Marker>
  ) : null;
}

const MapPicker = ({ setCoordinates }: Props) => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden ">
      <MapContainer
        center={[-26.2041, 28.0473]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker setCoordinates={setCoordinates} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
