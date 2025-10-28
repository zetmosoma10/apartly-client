import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import useGetLandlordApartments from "../../../hooks/useGetLandlordApartments";
import ApartmentGrid from "../../../components/ApartmentGrid";
import type { Apartment } from "../../../entities/Apartment";

const AdminApartmensPage = () => {
  const params = useParams();
  const landlordId = params.landlordId as string;

  const { data, isLoading } = useGetLandlordApartments(landlordId);
  const apartments = data?.results as Apartment[];
  const totalDocuments = data?.pagination?.totalDocuments as number;

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="max-container">
      <BackButton />
      <h2 className="mb-4">Admin - Apartments</h2>
      <ApartmentGrid apartments={apartments} totalDocuments={totalDocuments} />
    </div>
  );
};

export default AdminApartmensPage;
