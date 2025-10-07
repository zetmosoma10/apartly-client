import ApartmentCard from "../../components/ApartmentCard";
import useGetAllListings from "./../../hooks/useGetAllListings";

const ApartmentsPage = () => {
  const { data, isLoading } = useGetAllListings();
  const apartments = data?.results;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-full mx-auto md:max-w-4xl">
      <div className="grid grid-cols-3">
        {apartments?.map((apartment) => (
          <ApartmentCard apartment={apartment} key={apartment._id} />
        ))}
      </div>
    </section>
  );
};

export default ApartmentsPage;
