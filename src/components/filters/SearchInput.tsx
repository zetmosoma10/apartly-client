import { debounce } from "lodash";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

type Props = {
  handleFilterChange: (key: string, value: string) => void;
};

const SearchInput = ({ handleFilterChange }: Props) => {
  const [searchParams] = useSearchParams();
  // * Debounced search to prevent hitting API too often
  const debouncedSearch = debounce((value: string) => {
    handleFilterChange("search", value);
  }, 400);

  return (
    <div className="relative bg-white">
      <IoSearchOutline className="absolute top-3 left-2 text-zinc-400 z-20" />
      <input
        placeholder="Search apartments..."
        value={searchParams.get("search") || ""}
        onChange={(e) => debouncedSearch(e.target.value)}
        className="input w-full  bg-base-200 rounded-lg  indent-4 caret-warning focus:border-warning focus:outline-none"
      />
    </div>
  );
};

export default SearchInput;
