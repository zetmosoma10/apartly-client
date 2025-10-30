import { Link, Navigate, useSearchParams } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import ListingsTable from "./ListingsTable";
import BackButton from "../../components/BackButton";
import axios from "axios";
import useAuthStore from "../../store";
import ListingsTableSkeleton from "../../components/loadingIndicators/ListingsTableSkeleton";
import useGetAllUserApartments from "../../hooks/apartments/useGetAllUserApartments";
import Pagination from "../../components/filters/Pagination";

const ListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useGetAllUserApartments(searchParams);
  const { clearAuth } = useAuthStore();

  const page = parseInt(searchParams.get("page") || "1");
  const totalPages = data?.pagination?.totalPages;

  // ! 401 UNAUTHORIZE ERROR
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    clearAuth();

    return (
      <Navigate
        to="/auth/login"
        state={encodeURIComponent(error.response.data.message)}
      />
    );
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <section className="max-container">
      <BackButton />
      <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:items-center sm:justify-between">
        <h2>Your Listings</h2>
        <Link to="/apartments/listings/new" className="btn-main">
          <IoAddSharp />
          Add New Listing
        </Link>
      </div>
      {!isLoading ? <ListingsTable data={data} /> : <ListingsTableSkeleton />}
      {totalPages && totalPages > 1 && (
        <div className="flex items-center justify-center mt-11">
          <Pagination
            page={page}
            pagination={data.pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default ListingPage;
