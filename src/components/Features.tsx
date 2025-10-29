import { Link } from "react-router-dom";
import ApartmentCard from "./ApartmentCard";
import FeatureSkeleton from "./loadingIndicators/FeatureSkeleton";
import useGetFeatureApartments from "../hooks/apartments/useGetFeatureApartments";

const Features = () => {
  const { data, isLoading } = useGetFeatureApartments();
  const apartments = data?.results;

  return (
    <section className="mt-16 max-container">
      <h2 className="mb-6 text-2xl">Featured Apartments</h2>
      {isLoading ? (
        <FeatureSkeleton />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {apartments?.map((apartment) => (
            <ApartmentCard apartment={apartment} key={apartment._id} />
          ))}
        </div>
      )}
      <div className="mt-5 text-center">
        <Link to="/apartments" className="hover:underline hover:text-warning">
          View More
        </Link>
      </div>
    </section>
  );
};

export default Features;
