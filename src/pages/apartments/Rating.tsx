import { FaStar } from "react-icons/fa";
import type { Apartment } from "../../entities/Apartment";
import { useState } from "react";
import useAuthStore from "../../store";
import toast from "react-hot-toast";

const Rating = ({ apartment }: { apartment?: Apartment }) => {
  const [rating, setRating] = useState<number | null>(null);
  const { user } = useAuthStore();

  const handleRating = (value: number) => {
    if (!user) return toast.error("You must be logged in to rate.");
    setRating(value);
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-2 text-yellow-500">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={
              index < Math.round(apartment?.averageRatings as number)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">
          {apartment?.averageRatings} ({apartment?.totalRatings})
        </span>
      </div>

      {/*  */}
      {user && (
        <div className="flex items-center ml-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              onClick={() => handleRating(value)}
              className={`cursor-pointer ${
                rating && value <= rating ? "text-yellow-400" : "text-gray-400"
              } hover:text-yellow-500 transition`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rating;
