import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListingsTableSkeleton = () => {
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
        <tbody className="bg-white">
          {[...Array(5)].map((_, indx) => (
            <tr key={indx}>
              <td>
                <Skeleton />
              </td>
              <td className="hidden sm:table-cell">
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingsTableSkeleton;
