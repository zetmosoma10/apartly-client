import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import useGetAllListings from "../../hooks/useGetAllListings";
import ListingsTable from "./ListingsTable";

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
      {!isLoading ? <ListingsTable data={data} /> : <p>Loading...</p>}
    </section>
  );
};

export default ListingPage;
