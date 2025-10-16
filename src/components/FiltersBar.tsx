import { useSearchParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "lodash";

const apartmentTypes = [
  "1-bedroom",
  "2-bedrooms",
  "3-bedrooms",
  "studio",
  "bachelor",
  "other",
];

const statuses = ["available", "rented", "maintenance"];

const FiltersBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  // * Generic filter handler
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  // * Debounced search to prevent hitting API too often
  const debouncedSearch = debounce((value: string) => {
    handleFilterChange("search", value);
  }, 400);

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-white backdrop-blur-md rounded-2xl shadow p-4 mb-8 border border-base-300">
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative bg-white">
          <IoSearchOutline className="absolute top-3 left-2 text-zinc-400 z-20" />
          <input
            placeholder="Search apartments..."
            value={searchParams.get("search") || ""}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="input w-full  bg-base-200 rounded-lg  indent-4 caret-warning focus:border-warning focus:outline-none"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Type Filter */}
          <select
            className="select focus:select-warning w-full bg-base-200"
            value={searchParams.get("type") || ""}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">All Types</option>
            {apartmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="select focus:select-warning w-full bg-base-200"
            value={searchParams.get("status") || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filters */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            className="input w-full  bg-base-200 rounded-lg  indent-4 caret-warning focus:border-warning focus:outline-none"
            value={searchParams.get("minPrice") || ""}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            className="input w-full  bg-base-200 rounded-lg indent-4 caret-warning focus:border-warning focus:outline-none"
            value={searchParams.get("maxPrice") || ""}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
        </div>

        {/* Clear Button */}
        {Object.values(params).length > 0 && (
          <div className="flex justify-end md:justify-center">
            <button
              onClick={handleClearFilters}
              className="btn btn-sm btn-outline btn-neutral w-full md:w-auto"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersBar;
