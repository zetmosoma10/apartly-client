import ApartmentCard from "../../components/ApartmentCard";
import BackButton from "../../components/BackButton";
import Pagination from "../../components/Pagination";
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {apartments?.map((apartment) => (
            <ApartmentCard apartment={apartment} key={apartment._id} />
          ))}
        </div>
      )}
      <div className="mt-11 flex items-center justify-center">
        <Pagination />
      </div>
    </section>
  );
};

export default ApartmentsPage;
