import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApartmentsGridSkeletons = () => {
  return (
    <div
      role="progressbar"
      className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6"
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col w-full overflow-hidden shadow-sm rounded-2xl"
        >
          <div className="h-40 overflow-hidden">
            <Skeleton height="100%" />
          </div>
          <div className="flex flex-col justify-between flex-1 px-3 py-2 bg-white">
            <Skeleton count={2.3} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentsGridSkeletons;
