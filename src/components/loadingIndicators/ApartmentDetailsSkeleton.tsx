import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApartmentDetailsSkeleton = () => {
  return (
    <section className="max-container pt-10">
      <Skeleton width="400px" />
      <Skeleton width="350px" />
      <Skeleton width="150px" />

      {/* IMAGE GRID */}
      <div className="grid gap-2 mt-5 mb-8 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 h-[500px] sm:mt-8 sm:mb-12">
        <div className="overflow-hidden sm:col-span-2 sm:row-span-2 rounded-xl">
          <Skeleton height="100%" />
        </div>
        <div className="overflow-hidden sm:col-span-1 sm:row-span-1 rounded-xl">
          <Skeleton height="100%" />
        </div>
        <div className="overflow-hidden sm:col-span-1 sm:row-span-1 rounded-xl">
          <Skeleton height="100%" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <Skeleton width="350px" />
        <Skeleton count={3.5} />
      </div>
    </section>
  );
};

export default ApartmentDetailsSkeleton;
