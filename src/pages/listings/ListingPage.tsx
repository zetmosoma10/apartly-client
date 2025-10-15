import { Link, useSearchParams } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import ListingsTable from "./ListingsTable";
import ListingsTableSkeleton from "../../skeletons/ListingsTableSkeleton";
import BackButton from "../../components/BackButton";
import useGetAllUserApartments from "../../hooks/useGetAllUserApartments";
import Pagination from "../../components/Pagination";

const ListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetAllUserApartments(searchParams);

  const page = parseInt(searchParams.get("page") as string) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <section className="max-container">
      <BackButton />
      <div className="flex items-center justify-between">
        <h2>Your Listings</h2>
        <Link to="new" className="btn-main">
          <IoAddSharp />
          Add New Listing
        </Link>
      </div>
      {!isLoading ? <ListingsTable data={data} /> : <ListingsTableSkeleton />}
      <div className="mt-11 flex items-center justify-center">
        <Pagination
          data={data}
          page={page}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ListingPage;
