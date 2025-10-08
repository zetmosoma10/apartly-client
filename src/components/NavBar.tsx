import { Link, NavLink } from "react-router-dom";
import { RiBuilding2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

const navlinks = [
  { label: "Listings", to: "listings" },
  { label: "Apartments", to: "apartments" },
];

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 justify-between ">
      <div className="flex items-center space-x-3">
        <RiBuilding2Line size="20px" className="text-warning" />
        <Link to="/" className="logo-font font-extrabold text-xl">
          Apartly
        </Link>
      </div>
      <div className="space-x-3">
        {navlinks.map((link) => (
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              isActive ? "text-warning" : "text-black hover:text-warning"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <button className="md:hidden">
          <GiHamburgerMenu />
        </button>
        <Link to="/auth" className="btn-main">
          Login / Register
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
