import { useSearchParams } from "react-router-dom";
import ApartmentCard from "../../components/ApartmentCard";
import BackButton from "../../components/BackButton";
import Pagination from "../../components/Pagination";
import useGetAllApartments from "../../hooks/useGetAllApartments";
import ApartmentsGridSkeletons from "../../skeletons/ApartmentsGridSkeletons";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "lodash";

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
      <div className="mt-5">
        <div className="relative bg-white rounded-3xl shadow-md">
          <IoSearchOutline className="absolute top-3 left-2 text-zinc-400 z-20" />
          <input
            placeholder="Enter City, address"
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="input border-zinc-300 w-full rounded-3xl indent-4 caret-warning focus:outline-none focus:border-warning "
          />
        </div>
      </div>
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
