import { Link } from "react-router-dom";
import type { Apartment } from "../entities/Apartment";
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

const ApartmentCard = ({ apartment }: { apartment: Apartment }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageUrl = apartment.images[0]?.url;

  useEffect(() => {
    // Reset loading state when the image URL changes
    setIsImageLoaded(false);
  }, [imageUrl]);

  return (
    <Link
      to={apartment._id}
      className="w-full max-w-[250px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
    >
      <div className="relative w-full h-40 bg-gray-300  overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt="apartment preview"
          className="object-cover w-full h-full"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)} // handle broken images
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-2 px-3">
        <div>
          <h5 className="font-bold text-base">{apartment.title}</h5>
          <p className="font-medium text-sm opacity-70">
            R {apartment.price} / month
          </p>
        </div>

        <div className="flex items-center space-x-1 text-xs opacity-70 mt-1">
          <MdLocationOn />
          <span>{apartment.city}</span>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
