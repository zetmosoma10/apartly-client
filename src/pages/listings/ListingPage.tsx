import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import useGetAllListings from "../../hooks/useGetAllListings";
import Badge from "../../components/Badge";
import dayjs from "dayjs";

const ListingPage = () => {
  const { data, isLoading, error } = useGetAllListings();
  console.log(error);

  return (
    <section className="w-full mx-auto md:max-w-4xl">
      <div className="flex items-center justify-between">
        <h2>Your Listings</h2>
        <Link to="new" className="btn btn-warning rounded-3xl">
          <IoAddSharp />
          Add New Listing
        </Link>
      </div>
      {!isLoading ? (
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
              {data?.apartments?.map((item) => (
                <tr key={item._id} className="hover">
                  <td>
                    <Link to={item._id}>
                      <img
                        src={item.images[0].url}
                        className="object-cover h-20 w-36 rounded-xl"
                      />
                    </Link>
                  </td>
                  <td className="hidden sm:table-cell">
                    <Link to={item._id}>{item.address}</Link>
                  </td>
                  <td>
                    <Badge status={item.status} />
                  </td>
                  <td>{dayjs(item.createdAt).format("DD MMM YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default ListingPage;
