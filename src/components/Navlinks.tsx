import { NavLink } from "react-router-dom";
import useAuthStore from "../store";

const Navlinks = ({ className }: { className?: string }) => {
  const { user } = useAuthStore();

  return (
    <div className="space-x-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-warning"
            : `text-black hover:text-warning ${className}`
        }
      >
        Home
      </NavLink>
      {user && user.role !== "tenant" && (
        <NavLink
          to="/apartments/listings"
          className={({ isActive }) =>
            isActive
              ? "text-warning"
              : `text-black hover:text-warning ${className}`
          }
        >
          Listings
        </NavLink>
      )}
      <NavLink
        to="/apartments"
        className={({ isActive }) =>
          isActive
            ? "text-warning"
            : `text-black hover:text-warning ${className}`
        }
      >
        Apartments
      </NavLink>
    </div>
  );
};

export default Navlinks;
