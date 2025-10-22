import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AccountLoadingSkeleton = () => {
  return (
    <div className="max-w-3xl p-8 mx-auto bg-white border shadow-lg rounded-2xl">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
        <div className="w-40 mt-3">
          <Skeleton />
        </div>
        <div className="w-28">
          <Skeleton className="w-28" />
        </div>
      </div>
      {/* Info Section */}
      <div className="mt-8 space-y-3">
        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          <Skeleton />
          <Skeleton />
        </div>
        <div className="mt-3">
          <Skeleton />
        </div>
        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          <Skeleton />
          <Skeleton />
        </div>
        {/* Buttons Section */}
        <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
          <div className="w-36 h-26">
            <Skeleton className="h-full" />
          </div>
          <div className="w-36 h-26">
            <Skeleton className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLoadingSkeleton;
