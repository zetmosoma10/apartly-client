import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Badge from "../../components/Badge";
import type { Response } from "../../entities/Response";
import type { Apartment } from "../../entities/Apartment";

const ListingsTable = ({ data }: { data?: Response<Apartment[]> }) => {
  return (
    <div className="mt-8 overflow-x-auto border rounded-lg shadow-md">
      <table className="table">
        <thead className="bg-base-300">
          <tr>
            <th>Property</th>
            <th className="hidden sm:table-cell">Address</th>
            <th>Status</th>
            <th>Date Added</th>
          </tr>
        </thead>
        {data?.pagination.currentCountPerPage &&
        data.pagination.currentCountPerPage > 0 ? (
          <tbody className="bg-white">
            {data?.results?.map((item) => (
              <tr key={item._id} className="hover:bg-base-300">
                <td>
                  <Link to={`/apartments/listings/${item._id}`}>
                    <img
                      src={item.images[0].url}
                      className="object-cover h-20 w-36 rounded-xl"
                    />
                  </Link>
                </td>
                <td className="hidden sm:table-cell">
                  <Link to={`/apartments/listings/${item._id}`}>
                    {item.address}
                  </Link>
                </td>
                <td>
                  <Link to={`/apartments/listings/${item._id}`}>
                    <Badge status={item.status} />
                  </Link>
                </td>
                <td>
                  <Link to={`/apartments/listings/${item._id}`}>
                    {dayjs(item.createdAt).format("DD MMM YYYY")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4} className="py-4 text-center font-semibold">
                No Data Available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ListingsTable;
