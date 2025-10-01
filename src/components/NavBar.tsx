import { RiBuilding2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 justify-between ">
      <div className="flex items-center space-x-3">
        <RiBuilding2Line size="20px" className="text-warning" />
        <Link to="/" className="logo-font font-bold text-xl">
          Apartly
        </Link>
      </div>
      <div>Listings</div>
      <div>profile</div>
    </nav>
  );
};

export default NavBar;
