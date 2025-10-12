import { Link, useNavigate } from "react-router-dom";
import { RiBuilding2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import useAuthStore from "../store";
import Navlinks from "./Navlinks";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  return (
    <nav className="justify-between navbar bg-base-100 ">
      <div className="flex items-center space-x-3">
        <RiBuilding2Line size="20px" className="text-warning" />
        <Link to="/" className="text-xl font-extrabold logo-font">
          Apartly
        </Link>
      </div>
      <Navlinks />
      <div className="flex items-center space-x-2">
        <button className="md:hidden">
          <GiHamburgerMenu />
        </button>
        {!user ? (
          <Link to="/auth" className="btn-main">
            Login / Register
          </Link>
        ) : (
          <button
            className="text-sm hover:underline"
            onClick={() => {
              clearAuth();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
        {user && (
          <div className="flex items-center justify-center p-2 rounded-full bg-neutral text-neutral-content">
            <span className="text-xs">
              {user?.firstName[0]}
              {user?.lastName[0]}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
