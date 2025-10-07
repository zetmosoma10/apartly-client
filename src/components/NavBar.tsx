import { RiBuilding2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const navlinks = [
  { label: "Listings", to: "listings" },
  { label: "Apartments", to: "apartments" },
];

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 justify-between ">
      <div className="flex items-center space-x-3">
        <RiBuilding2Line size="20px" className="text-warning" />
        <Link to="/" className="logo-font font-bold text-xl">
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
      <div>profile</div>
    </nav>
  );
};

export default NavBar;
