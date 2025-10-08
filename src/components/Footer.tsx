import { RiBuilding2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../constance";

const Footer = () => {
  return (
    <footer className=" py-8 bg-gray-800">
      <div className="flex flex-col gap-y-4 items-center justify-between sm:flex-row">
        <div className="flex items-center space-x-3">
          <RiBuilding2Line size="20px" className="text-warning" />
          <Link to="/" className="logo-font font-extrabold text-xl text-white">
            Apartly
          </Link>
        </div>
        <div className="flex flex-col items-center text-center sm:flex-row  sm:space-x-3 ">
          {navLinks.map((link) => (
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-warning" : "text-white hover:text-warning"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <p className="text-sm text-white opacity-70">
          &copy; Apartly. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
