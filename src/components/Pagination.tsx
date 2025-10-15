import type { Apartment } from "../entities/Apartment";
import type { Response } from "../entities/Response";
import _ from "lodash";

type Props = {
  page: number;
  data?: Response<Apartment[]>;
  handlePageChange: (page: number) => void;
};

const Pagination = ({ page, data, handlePageChange }: Props) => {
  let pagesArray;
  if (data?.pagination)
    pagesArray = _.range(1, data?.pagination?.totalPages + 1);

  return (
    <div className="join shadow-lg">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="join-item btn bg-white hover:text-white hover:bg-warning hover:border-warning"
      >
        «
      </button>

      {pagesArray?.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`join-item btn  hover:text-white hover:bg-warning hover:border-warning ${
            page === data?.pagination.currentPage
              ? "bg-warning  text-white"
              : "bg-white text-black"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!data?.pagination.hasNextPage}
        className="join-item btn bg-white hover:text-white hover:bg-warning hover:border-warning"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
