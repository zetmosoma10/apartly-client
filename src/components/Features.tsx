import { Link } from "react-router-dom";
import useGetFeatureApartments from "../hooks/useGetFeatureApartments";
import FeatureSkeleton from "../skeletons/FeatureSkeleton";
import ApartmentCard from "./ApartmentCard";

const Features = () => {
  const { data, isLoading } = useGetFeatureApartments();
  const apartments = data?.results;

  return (
    <section className="max-container mt-16">
      <h2 className="text-2xl mb-6">Featured Apartments</h2>
      {isLoading ? (
        <FeatureSkeleton />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {apartments?.map((apartment) => (
            <ApartmentCard apartment={apartment} key={apartment._id} />
          ))}
        </div>
      )}
      <Link
        to="/apartments"
        className="flex items-center justify-center mt-5 hover:underline hover:text-warning"
      >
        View More
      </Link>
    </section>
  );
};

export default Features;
