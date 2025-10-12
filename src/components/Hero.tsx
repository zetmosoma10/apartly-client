import image from "../assets/pexels-david-bartus.webp";
import { IoSearchOutline } from "react-icons/io5";

const Hero = () => {
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

      <div className="text-center z-20 mx-10">
        <h1 className="text-white font-extrabold text-5xl sm:text-6xl max-w-[500px]">
          Find Your <span className="text-warning">Perfect</span> Home
        </h1>
        <p className="mt-3 text-white">
          Explore a wide range of apartments for rent in your desired location
        </p>
        <div className="input input-bordered flex items-center gap-2 w-full rounded-3xl mt-5 focus:outline-none pr-0 ring-green-400">
          <IoSearchOutline className="text-black text-opacity-70 text-xl" />
          <input
            type="text"
            className="grow w-full text-back"
            name="search"
            placeholder="Enter city, location"
          />
          <button className="btn-main">Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
