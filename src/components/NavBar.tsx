import { Link, NavLink } from "react-router-dom";
import { RiBuilding2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { navLinks } from "../constance";
import useAuthStore from "../store";

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
      <div className="space-x-3">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
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
        {!user && (
          <Link to="/auth" className="btn-main">
            Login / Register
          </Link>
        )}
        {user && (
          <div className="flex items-center justify-center p-2 rounded-full bg-neutral text-neutral-content">
            <span className="text-sm">
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
