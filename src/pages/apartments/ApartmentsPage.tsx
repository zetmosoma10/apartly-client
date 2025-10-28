import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Apartment } from "../../entities/Apartment";
import BackButton from "../../components/BackButton";
import Pagination from "../../components/filters/Pagination";
import useGetAllApartments from "../../hooks/useGetAllApartments";
import FiltersBar from "../../components/filters/FiltersBar";
import Heading from "./Heading";
import Search from "../../components/filters/Search";
import ApartmentsGridSkeletons from "../../components/loadingIndicators/ApartmentsGridSkeletons";
import ApartmentGrid from "../ApartmentGrid";

const ApartmentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetAllApartments(searchParams);
  const apartments = data?.results as Apartment[];

  const page = parseInt(searchParams.get("page") as string) || 1;
  const totalPages = data?.pagination?.totalPages as number;
  const totalDocuments = data?.pagination?.totalDocuments as number;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  // * Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <section className="max-container">
      <BackButton />
      <div>
        <Search />
        <FiltersBar />
      </div>
      <Heading />
      {isLoading ? (
        <ApartmentsGridSkeletons />
      ) : (
        <ApartmentGrid
          apartments={apartments}
          totalDocuments={totalDocuments}
        />
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-11">
          <Pagination
            data={data}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default ApartmentsPage;
