import { FaStar } from "react-icons/fa";
import type { Apartment } from "../../../entities/Apartment";
import { useState } from "react";
import useAuthStore from "../../../store";
import toast from "react-hot-toast";
import useAddRating from "../../../hooks/apartments/useAddRating";

const Rating = ({ apartment }: { apartment?: Apartment }) => {
  const [rating, setRating] = useState<number | null>(null);
  const { user } = useAuthStore();
  const { mutate } = useAddRating();

  const totalRatings = apartment?.totalRatings as number;
  const averageRatings = apartment?.averageRatings as number;

  const handleRating = (value: number) => {
    if (!user) return toast.error("You must be logged in to rate.");
    setRating(value);

    // * Attach id and rating
    const payload = {
      id: apartment?._id,
      rating: value,
    };

    mutate(payload, {
      onSuccess: () => setRating(null),
    });
  };

  return (
    <div className="flex items-center gap-3">
      {totalRatings > 0 && (
        <div className="flex items-center gap-1 my-2 text-yellow-500">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">
            {averageRatings} ({totalRatings} reviews)
          </span>
        </div>
      )}

      {/*  */}
      {user && (
        <div className="flex items-center my-2 ml-4">
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
