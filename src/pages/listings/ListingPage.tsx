import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";

const ListingPage = () => {
  return (
    <section className="w-full md:max-w-xl lg:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2>Your Listings</h2>
        <Link to="new" className="btn btn-warning rounded-3xl">
          <IoAddSharp />
          Add New Listing
        </Link>
      </div>
    </section>
  );
};

export default ListingPage;
