import { RiBuilding2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuthStore from "../../store";
import Navlinks from "./Navlinks";
import ProfileLink from "./ProfileLink";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const { user } = useAuthStore();

  return (
    <nav className="justify-between navbar bg-base-100 ">
      <div className="flex items-center space-x-3">
        <RiBuilding2Line size="20px" className="text-warning" />
        <Link to="/" className="text-xl font-extrabold logo-font">
          Apartly
        </Link>
      </div>
      <div className="hidden md:block">
        <Navlinks />
      </div>
      <div className="hidden md:block">
        {!user && (
          <Link to="/auth" className=" btn-main">
            Login / Register
          </Link>
        )}
        {user && <ProfileLink />}
      </div>

      {/* Mobile Navbar */}
      <MobileNav />
    </nav>
  );
};

export default NavBar;
