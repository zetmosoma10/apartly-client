import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Apartment } from "../../../entities/Apartment";
import dayjs from "dayjs";
import useAuthStore from "../../../store";
import useAddComment from "../../../hooks/apartments/useAddComment";

const schema = z.object({
  comment: z.string().min(1, "review too short").max(255, "review too long"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  apartment?: Apartment;
};

const Comments = ({ apartment }: Props) => {
  const { user } = useAuthStore();
  const { mutate } = useAddComment();
  const length = apartment?.ratings?.filter((r) => r.comment).length as number;
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

    const payload = { id: apartment?._id, comment: data.comment };

    mutate(payload, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="w-full p-6 mt-8 bg-white border shadow-md rounded-2xl">
      {/* Header */}
      <h3 className="mb-4 text-lg font-semibold text-neutral-800">
        Tenant Reviews
      </h3>

      {/* Add New Review */}
      {user && user._id !== apartment?.landlord._id && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-8">
          {user?.avatar?.url ? (
            <img
              src={user?.avatar?.url}
              alt="User avatar"
              className="object-cover w-10 h-10 border rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
              <span className="text-white">
                {user?.firstName[0]}
                {user?.lastName[0]}
              </span>
            </div>
          )}
          <div className="w-full">
            <div className="flex items-center flex-1 px-4 border rounded-full bg-neutral-100">
              <input
                type="text"
                placeholder="Write a review..."
                className="flex-1 py-2 text-sm bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400"
                {...register("comment")}
              />
              <button
                type="submit"
                className="p-2 transition rounded-full text-warnign hover:bg-warning/50"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
            {errors.comment?.message && (
              <p className="block text-sm text-error text-end">
                {errors.comment?.message}
              </p>
            )}
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="pr-2 space-y-5 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-neutral-300">
        {length > 0 ? (
          ratings
            ?.filter((r) => r.comment)
            .map((review) => (
              <div
                key={review?._id}
                className="flex items-start gap-3 pb-4 border-b border-neutral-200"
              >
                {review?.tenant?.avatar?.url ? (
                  <img
                    src={review?.tenant?.avatar?.url}
                    alt={review?.tenant?.firstName}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                    <span className="text-gray-100">
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-neutral-800 ">
                      {review?.tenant?.firstName} {review?.tenant?.lastName}
                    </p>
                    <span className="text-xs text-neutral-500 ">
                      {dayjs(review?.createdAt).format("DD MMM YYYY")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-neutral-700">
                    {review?.comment}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p className="py-4 text-sm text-center text-neutral-500">
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

export default Comments;
