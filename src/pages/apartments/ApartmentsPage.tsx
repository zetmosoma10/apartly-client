import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApartmentGrid from "../../components/ApartmentGrid";
import BackButton from "../../components/BackButton";
import FiltersBar from "../../components/filters/FiltersBar";
import PaginationType from "../../components/filters/Pagination";
import Search from "../../components/filters/Search";
import ApartmentsGridSkeletons from "../../components/loadingIndicators/ApartmentsGridSkeletons";
import type { Apartment } from "../../entities/Apartment";
import useGetAllApartments from "../../hooks/apartments/useGetAllApartments";
import Heading from "./Heading";

const ApartmentsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetAllApartments(searchParams);
  const apartments = data?.results as Apartment[];

  const page = parseInt(searchParams.get("page") || "1");
  const totalPages = data?.pagination?.totalPages;
  const totalDocuments = data?.pagination?.totalDocuments;

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

      {/* APARTMENT GRID */}
      {isLoading ? (
        <ApartmentsGridSkeletons />
      ) : (
        <ApartmentGrid
          apartments={apartments}
          totalDocuments={totalDocuments}
        />
      )}

      {/* PAGINATION */}
      {totalPages && totalPages > 1 && (
        <div className="flex items-center justify-center mt-11">
          <PaginationType
            page={page}
            pagination={data.pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default ApartmentsPage;
