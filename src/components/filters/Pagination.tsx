import _ from "lodash";
import type { PaginationType } from "../../entities/Response";

type Props = {
  page: number;
  pagination?: PaginationType;
  handlePageChange: (page: number) => void;
};

const Pagination = ({ page, pagination, handlePageChange }: Props) => {
  let pagesArray;
  if (pagination) pagesArray = _.range(1, pagination?.totalPages + 1);

  return (
    <div className="shadow-lg join">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="bg-white join-item btn hover:text-white hover:bg-warning hover:border-warning"
      >
        «
      </button>

      {pagesArray?.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`join-item btn  hover:text-white hover:bg-warning hover:border-warning ${
            page === pagination?.currentPage
              ? "bg-warning  text-white"
              : "bg-white text-black"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!pagination?.hasNextPage}
        className="bg-white join-item btn hover:text-white hover:bg-warning hover:border-warning"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
