import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import useGetAllListings from "../../hooks/useGetAllListings";
import Badge from "../../components/Badge";

const ListingPage = () => {
  const { data, isLoading, error } = useGetAllListings();
  console.log(error);

  return (
    <section className="w-full mx-auto md:max-w-xl lg:max-w-4xl">
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
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
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
                  <td>
                    <Link to={item._id}>{item.address}</Link>
                  </td>
                  <td>
                    <Badge status={item.status} />
                  </td>
                  <td>
                    <div className="flex items-center justify-center h-full space-x-2 place-self-center">
                      <button className="btn btn-xs btn-neutral">Edit</button>
                      <button className="btn btn-xs btn-error">Remove</button>
                    </div>
                  </td>
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
