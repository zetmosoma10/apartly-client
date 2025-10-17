const ClearButton = ({
  handleClearFilters,
}: {
  handleClearFilters: () => void;
}) => {
  return (
    <button
      onClick={handleClearFilters}
      className="btn btn-sm btn-outline btn-neutral w-full md:w-auto"
    >
      Clear Filters
    </button>
  );
};

export default ClearButton;
