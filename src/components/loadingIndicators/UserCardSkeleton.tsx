import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserGridCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 mt-5">
      {[...Array(8)].map((i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-4 p-5 transition-all bg-white border shadow-md rounded-2xl lg:flex-row"
        >
          {/* Avatar Skeleton */}
          <div className="flex-shrink-0">
            <Skeleton circle width={80} height={80} />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 w-full text-center sm:text-left">
            {/* Name Skeleton */}
            <div className="mb-2">
              <Skeleton width={150} height={20} className="mb-1" />
            </div>

            {/* Role Badge Skeleton */}
            <div className="mb-3">
              <Skeleton width={80} height={20} />
            </div>

            {/* Contact Info Skeleton */}
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Skeleton width={200} height={16} />
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Skeleton width={150} height={16} />
              </div>
            </div>

            {/* Join Date Skeleton */}
            <div className="mt-3">
              <Skeleton width={120} height={14} />
            </div>
          </div>

          {/* Button Group Skeleton */}
          <div className="grid w-full gap-2 lg:w-auto">
            <Skeleton height={32} className="w-full rounded lg:w-auto" />
            <Skeleton height={32} className="w-full rounded lg:w-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGridCardSkeleton;
