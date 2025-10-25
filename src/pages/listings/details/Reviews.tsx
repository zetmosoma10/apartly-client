import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Apartment } from "../../../entities/Apartment";
import dayjs from "dayjs";
import useAuthStore from "../../../store";
import useAddRating from "../../../hooks/useAddRating";

const schema = z.object({
  comment: z.string().min(1, "review too short").max(255, "review too long"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  apartment?: Apartment;
};

const Reviews = ({ apartment }: Props) => {
  const { user } = useAuthStore();
  const { mutate } = useAddRating();
  const length = apartment?.ratings?.length as number;
  const ratings = apartment?.ratings;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // * Attach id and comment
    const payload = {
      id: apartment?._id,
      review: {
        comment: data.comment,
      },
    };

    mutate(payload, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="mt-8 bg-white  rounded-2xl border shadow-md p-6 w-full">
      {/* Header */}
      <h3 className="text-lg font-semibold text-neutral-800  mb-4">
        Tenant Reviews
      </h3>

      {/* Add New Review */}
      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
          {user?.avatar?.url ? (
            <img
              src={user?.avatar?.url}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black">
              <span className="text-white">
                {user?.firstName[0]}
                {user?.lastName[0]}
              </span>
            </div>
          )}
          <div className="w-full">
            <div className="flex-1 flex items-center bg-neutral-100  rounded-full px-4 border">
              <input
                type="text"
                placeholder="Write a review..."
                className="flex-1 bg-transparent outline-none text-sm text-neutral-800  placeholder:text-neutral-400 py-2"
                {...register("comment")}
              />
              <button
                type="submit"
                className="p-2 rounded-full text-warnign hover:bg-warning/50 transition"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
            {errors.comment?.message && (
              <p className="text-sm text-error block text-end">
                {errors.comment?.message}
              </p>
            )}
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-5 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 pr-2">
        {length > 0 ? (
          ratings?.map((review) => (
            <div
              key={review?._id}
              className="flex items-start gap-3 border-b border-neutral-200  pb-4"
            >
              {review?.tenant?.avatar?.url ? (
                <img
                  src={review?.tenant?.avatar?.url}
                  alt={review?.tenant?.firstName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black">
                  <span className="text-gray-100">
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-neutral-800 ">
                    {review?.tenant?.firstName} {review?.tenant?.lastName}`
                  </p>
                  <span className="text-xs text-neutral-500 ">
                    {dayjs(review?.createdAt).format("DD MMM YYYY")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-700  leading-snug">
                  {review?.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500  text-center py-4">
            No reviews yet.{" "}
            {user
              ? "Be the first to share your experience!"
              : "Please login to add review comment"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
