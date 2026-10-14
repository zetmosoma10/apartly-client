import { MdLocationOn } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import type { Apartment } from "../entities/Apartment";
import Badge from "./Badge";

const ApartmentCard = ({ apartment }: { apartment: Apartment }) => {
  const { pathname } = useLocation();
  const pathnameArray = pathname.split("/");
  const isAdmin = pathnameArray.includes("admin");

  const imageUrl = apartment.images[0]?.url;

  return (
    <Link
      to={
        isAdmin
          ? `/admin/users/apartments/${apartment._id}`
          : `/apartments/${apartment._id}`
      }
      className="flex flex-col w-full overflow-hidden transition-all bg-white border shadow-sm rounded-2xl hover:shadow-md"
    >
      <div className="relative w-full h-40 overflow-hidden bg-gray-300">
        <Badge
          status={apartment.status}
          className="absolute px-1 py-1 text-xs top-2 left-2"
        />
        <img
          src={imageUrl}
          alt="apartment preview"
          className="z-10 object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 px-3 py-2">
        <div>
          <h5 className="text-base font-bold leading-tight">
            {apartment.title}
          </h5>
          <p className="mt-1 text-sm font-medium opacity-70">
            R {apartment.price} / month
          </p>
        </div>

        <div className="flex items-center mt-1 space-x-1 text-xs opacity-70">
          <MdLocationOn />
          <span>{apartment.city}</span>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
