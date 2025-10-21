import { RiBuilding2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Navlinks from "./navigation/Navlinks";

const Footer = () => {
  return (
    <footer className=" py-8 bg-gray-800">
      <div className="max-container flex flex-col gap-y-4 items-center justify-between sm:flex-row">
        <div className="flex items-center space-x-3">
          <RiBuilding2Line size="20px" className="text-warning" />
          <Link to="/" className="logo-font font-extrabold text-xl text-white">
            Apartly
          </Link>
        </div>
        <Navlinks className="text-white" />
        <p className="text-sm text-white opacity-70">
          &copy; Apartly. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
