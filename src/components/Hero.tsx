import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import image from "../assets/pexels-david-bartus.webp";

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return null;

    navigate(`/apartments?search=${encodeURIComponent(search)}`);
  };

  return (
    <section
      className="w-full min-h-[450px] relative flex items-center justify-center "
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/60" />

      <div className="z-20 mx-10 text-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl max-w-[500px]">
          Find Your <span className="text-warning">Perfect</span> Home
        </h1>
        <p className="mt-3 text-white">
          Explore a wide range of apartments for rent in your desired location
        </p>
        <form
          onSubmit={onSubmit}
          className="flex items-center w-full gap-2 pr-0 mt-5 input input-sm sm:input-md input-warning input-bordered rounded-3xl "
        >
          <IoSearchOutline className="text-xl text-black text-opacity-70" />
          <input
            name="search"
            type="text"
            className="w-full grow text-back "
            placeholder="Search apartments..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-main">Search</button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
