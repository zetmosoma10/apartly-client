import { RiBuilding2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import TabletNavlink from "./TabletNavlink";
import useAuthStore from "../../store";

const Footer = () => {
  const { user } = useAuthStore();

  return (
    <footer className="py-8 bg-gray-800 ">
      <div className="flex flex-col items-center justify-between max-container gap-y-4 md:flex-row">
        <div className="flex items-center space-x-3">
          <RiBuilding2Line size="20px" className="text-warning" />
          <Link to="/" className="text-xl font-extrabold text-white logo-font">
            Apartly
          </Link>
        </div>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-start">
          <TabletNavlink to="/" className="text-white">
            Home
          </TabletNavlink>
          <TabletNavlink end={true} to="/apartments" className="text-white">
            Apartments
          </TabletNavlink>
          {user && user.role === "landlord" && (
            <TabletNavlink to="/apartments/listings" className="text-white">
              Listings
            </TabletNavlink>
          )}
          {user && (
            <TabletNavlink to="/account" className="text-white">
              Account
            </TabletNavlink>
          )}
          {user && user.role === "admin" && (
            <TabletNavlink to="/admin" className="text-white">
              Admin
            </TabletNavlink>
          )}
        </div>
        <p className="text-sm text-white opacity-70">
          &copy; Apartly. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
