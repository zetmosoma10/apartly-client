import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import ApartmentDetailsSkeleton from "../../../components/loadingIndicators/ApartmentDetailsSkeleton";
import useGetApartment from "../../../hooks/apartments/useGetApartment";
import AmenitiesSection from "./AmenitiesSection";
import CommentsSection from "./CommentsSection";
import DescriptionSection from "./DescriptionSection";
import ImageGridSection from "./ImageGridSection";
import HeaderSection from "./HeaderSection";
import MapSection from "./MapSection";

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetApartment(id);
  const apartment = data?.results;

  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      navigate("/not-found", { replace: true });
    }
  }

  if (isLoading) return <ApartmentDetailsSkeleton />;

  return (
    <section className="max-container">
      <BackButton />
      <HeaderSection apartment={apartment} />
      <ImageGridSection images={apartment?.images} />
      <DescriptionSection apartment={apartment} />
      <AmenitiesSection amenities={apartment?.amenities} />
      <MapSection apartment={apartment} />
      <CommentsSection apartment={apartment} />
    </section>
  );
};

export default ListingDetailPage;
