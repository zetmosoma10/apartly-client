import type { Apartment } from "../../../entities/Apartment";
import ApartmentMap from "../ApartmentMap";

const MapSection = ({ apartment }: { apartment?: Apartment }) => {
  return (
    <div className="mt-6 space-y-3">
      <h3>Location</h3>
      <ApartmentMap coordinates={apartment?.coordinates} />
    </div>
  );
};

export default MapSection;
