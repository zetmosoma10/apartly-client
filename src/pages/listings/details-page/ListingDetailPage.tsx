import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import ApartmentDetailsSkeleton from "../../../components/loadingIndicators/ApartmentDetailsSkeleton";
import useGetApartment from "../../../hooks/apartments/useGetApartment";
import ApartmentMap from "../ApartmentMap";
import Amenities from "./Amenities";
import Comments from "./Comments";
import Description from "./Description";
import ImageGrid from "./ImageGrid";
import HeaderSection from "./HeaderSection";

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
      {/* IMAGE GRID */}
      <ImageGrid images={apartment?.images} />
      {/* DESCRIPTION */}
      <Description
        landlord={apartment?.landlord}
        description={apartment?.description}
        bathrooms={apartment?.bathrooms}
        bedrooms={apartment?.bedrooms}
        price={apartment?.price}
      />
      {/* AMENITES */}
      <Amenities amenities={apartment?.amenities} />
      {/* APARTMENT MAP */}
      <div className="mt-6 space-y-3">
        <h3>Location</h3>
        <ApartmentMap coordinates={apartment?.coordinates} />
      </div>
      {/* REVIEW SECTION */}
      <Comments apartment={apartment} />
    </section>
  );
};

export default ListingDetailPage;
