import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  coordinates?: {
    lat: number;
    lng: number;
  };
};

const ApartmentMap = ({ coordinates }: Props) => {
  const lat = coordinates?.lat as number;
  const lng = coordinates?.lng as number;

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer center={[lat, lng]} zoom={15} className="w-full h-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>Apartment Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ApartmentMap;
