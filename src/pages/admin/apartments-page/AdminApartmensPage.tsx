import { useLocation, useParams } from "react-router-dom";
import type { Apartment } from "../../../entities/Apartment";
import BackButton from "../../../components/BackButton";
import ApartmentGrid from "../../../components/ApartmentGrid";
import ApartmentsGridSkeletons from "../../../components/loadingIndicators/ApartmentsGridSkeletons";
import useGetLandlordApartments from "../../../hooks/admin/useGetLandlordApartments";

const AdminApartmensPage = () => {
  const params = useParams();
  const { state } = useLocation();
  const landlordId = params.landlordId as string;

  const { data, isLoading } = useGetLandlordApartments(landlordId);
  const apartments = data?.results as Apartment[];
  const totalDocuments = data?.pagination?.totalDocuments as number;

  return (
    <div className="max-container">
      <BackButton />
      <h2 className="mb-4">Admin - Apartments for {state}</h2>
      {isLoading ? (
        <ApartmentsGridSkeletons />
      ) : (
        <ApartmentGrid
          apartments={apartments}
          totalDocuments={totalDocuments}
        />
      )}
    </div>
  );
};

export default AdminApartmensPage;
