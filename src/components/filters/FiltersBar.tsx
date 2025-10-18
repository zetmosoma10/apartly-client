import { useSearchParams } from "react-router-dom";
import SelectFilter from "./SelectFilter";
import ClearButton from "./ClearButton";

const statuses = ["available", "rented", "maintenance"];
const prices = [2000, 5000, 8000, 10_000, 15_000, 20_000];
const apartmentTypes = [
  "1-bedroom",
  "2-bedrooms",
  "3-bedrooms",
  "studio",
  "bachelor",
  "other",
];

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

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-white backdrop-blur-md rounded-2xl shadow p-4 mb-9 border md:max-w-[500px]">
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Type Filter */}
          <SelectFilter
            paramKey="type"
            defaultOption="All Types"
            value={searchParams.get("type") || ""}
            handleFilterChange={handleFilterChange}
            options={apartmentTypes}
          />
          {/* Status Filter */}
          <SelectFilter
            paramKey="status"
            defaultOption="All Status"
            value={searchParams.get("status") || ""}
            handleFilterChange={handleFilterChange}
            options={statuses}
          />
        </div>
        {/* Price Filter */}
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectFilter
            paramKey="minPrice"
            defaultOption="minPrice"
            value={searchParams.get("minPrice") || ""}
            handleFilterChange={handleFilterChange}
            options={prices}
          />
          <SelectFilter
            paramKey="maxPrice"
            defaultOption="maxPrice"
            value={searchParams.get("maxPrice") || ""}
            handleFilterChange={handleFilterChange}
            options={prices}
          />
        </div>
        {/* Clear Button */}
        {Object.values(params).length > 0 && (
          <div className="flex justify-end md:justify-center">
            <ClearButton handleClearFilters={handleClearFilters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersBar;
