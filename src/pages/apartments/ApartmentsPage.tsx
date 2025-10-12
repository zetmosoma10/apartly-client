import ApartmentCard from "../../components/ApartmentCard";
import BackButton from "../../components/BackButton";
import useGetAllApartments from "../../hooks/useGetAllApartments";
import ApartmentsGridSkeletons from "../../skeletons/ApartmentsGridSkeletons";

const ApartmentsPage = () => {
  const { data, isLoading } = useGetAllApartments();
  const apartments = data?.results;

  return (
    <section className="max-container">
      <BackButton />
      {isLoading ? (
        <ApartmentsGridSkeletons />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {apartments?.map((apartment) => (
            <ApartmentCard apartment={apartment} key={apartment._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ApartmentsPage;
