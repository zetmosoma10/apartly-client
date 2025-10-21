import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, reset } = useForm<{ search: string }>();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const onSubmit = (data: { search: string }) => {
    handleFilterChange("search", data.search);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white w-full md:max-w-[70%] mx-auto  backdrop-blur-md shadow mt-4 mb-7 rounded-lg"
    >
      <IoSearchOutline className="absolute top-3 left-2 text-zinc-400 z-20" />
      <input
        {...register("search")}
        placeholder="Search apartments..."
        className="input w-full   rounded-lg  indent-4 caret-warning focus:border-warning focus:outline-none"
      />
    </form>
  );
};

export default Search;
