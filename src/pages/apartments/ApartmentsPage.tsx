import ApartmentCard from "../../components/ApartmentCard";
import BackButton from "../../components/BackButton";
import useGetAllApartments from "../../hooks/useGetAllApartments";

const ApartmentsPage = () => {
  const { data, isLoading } = useGetAllApartments();
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
