import LoadingSpinner from "./LoadingSpinner";

const LoaderOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner />
        <p className="text-white text-sm">Please wait...</p>
      </div>
    </div>
  );
};

export default LoaderOverlay;
