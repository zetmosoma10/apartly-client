const ClearButton = ({
  handleClearFilters,
}: {
  handleClearFilters: () => void;
}) => {
  return (
    <button
      onClick={handleClearFilters}
      className="btn btn-xs md:btn-sm btn-outline btn-neutral"
    >
      Clear Filters
    </button>
  );
};

export default ClearButton;
