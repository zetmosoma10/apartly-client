import ApartmentCard from "../../components/ApartmentCard";
import BackButton from "../../components/BackButton";
import useGetAllListings from "./../../hooks/useGetAllListings";

const ApartmentsPage = () => {
  const { data, isLoading } = useGetAllListings();
  const apartments = data?.results;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="max-container">
      <BackButton />
      <div className="grid grid-cols-3">
        {apartments?.map((apartment) => (
          <ApartmentCard apartment={apartment} key={apartment._id} />
        ))}
      </div>
    </section>
  );
};

export default ApartmentsPage;
