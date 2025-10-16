import { useSearchParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "lodash";
import ApartmentCard from "../../components/ApartmentCard";
import BackButton from "../../components/BackButton";
import Pagination from "../../components/Pagination";
import useGetAllApartments from "../../hooks/useGetAllApartments";
import ApartmentsGridSkeletons from "../../skeletons/ApartmentsGridSkeletons";
import FiltersBar from "../../components/FiltersBar";

const ApartmentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { data, isLoading } = useGetAllApartments(searchParams);
  // const apartments = data?.results;

  const page = parseInt(searchParams.get("page") as string) || 1;

  const handleSearch = debounce((value: string) => {
    handleFilterChange("search", value);
    console.log(value);
  }, 300);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <section className="max-container">
      <BackButton />
      <FiltersBar />
    </section>
  );
};

export default ApartmentsPage;

// {isLoading ? (
//   <ApartmentsGridSkeletons />
// ) : (
//   <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
//     {apartments?.map((apartment) => (
//       <ApartmentCard apartment={apartment} key={apartment._id} />
//     ))}
//   </div>
// )}
// <div className="mt-11 flex items-center justify-center">
//   <Pagination
//     data={data}
//     page={page}
//     handlePageChange={handlePageChange}
//   />
// </div>
