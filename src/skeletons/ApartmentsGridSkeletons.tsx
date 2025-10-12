import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ApartmentsGridSkeletons = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="w-full  rounded-2xl  shadow-sm flex flex-col overflow-hidden"
        >
          <div className="h-40 overflow-hidden">
            <Skeleton height="100%" />
          </div>
          <div className="flex-1 flex flex-col justify-between py-2 px-3 bg-white">
            <Skeleton count={2.3} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentsGridSkeletons;
