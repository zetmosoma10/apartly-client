import ApartmentCard from "./ApartmentCard";
import type { Apartment } from "../entities/Apartment";

type Props = {
  apartments: Apartment[];
  totalDocuments: number;
};

const ApartmentGrid = ({ apartments, totalDocuments }: Props) => {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {apartments?.map((apartment) => (
          <ApartmentCard apartment={apartment} key={apartment._id} />
        ))}
      </div>
      {totalDocuments === 0 && <p>No Apartments in the database</p>}
    </>
  );
};

export default ApartmentGrid;
