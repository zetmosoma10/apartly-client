import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
    <div className="h-[400px] w-full rounded-lg overflow-hidden ">
      <MapContainer center={[lat, lng]} zoom={15} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>Apartment Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ApartmentMap;
