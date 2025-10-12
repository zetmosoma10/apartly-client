import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import ListingsTable from "./ListingsTable";
import ListingsTableSkeleton from "../../skeletons/ListingsTableSkeleton";
import BackButton from "../../components/BackButton";
import useGetAllUserApartments from "../../hooks/useGetUserListings";

const ListingPage = () => {
  const { data, isLoading } = useGetAllUserApartments();

  return (
    <section className="max-container">
      <BackButton />
      <div className="flex items-center justify-between">
        <h2>Your Listings</h2>
        <Link to="new" className="btn-main">
          <IoAddSharp />
          Add New Listing
        </Link>
      </div>
      {!isLoading ? <ListingsTable data={data} /> : <ListingsTableSkeleton />}
    </section>
  );
};

export default ListingPage;
