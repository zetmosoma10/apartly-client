import { useParams, Link } from "react-router-dom";
import useGetApartment from "../../../hooks/useGetApartment";
import Badge from "../../../components/Badge";

const ListingDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetApartment(id);
  const apartment = data?.results;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-full mx-auto md:max-w-5xl">
      <h2>{apartment?.title}</h2>
      <p className="text-base md:text-lg opacity-70">
        {apartment?.address}, {apartment?.city}
      </p>
      <Badge status={apartment!.status} />
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px] mt-8 mb-12">
        <div
          className="col-span-2 row-span-2 overflow-hidden rounded-xl"
          style={{
            backgroundImage: `url(${apartment?.images[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="col-span-1 row-span-1 overflow-hidden rounded-xl"
          style={{
            backgroundImage: `url(${apartment?.images[1].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="col-span-1 row-span-1 overflow-hidden rounded-xl"
          style={{
            backgroundImage: `url(${apartment?.images[2].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="flex mt-5 flex-cols sm:flex-row sm:justify-between">
        <div>
          <h3>Descriptions</h3>
          <p className="leading-tight opacity-70">{apartment?.description}</p>
        </div>
        <div className="border p-4 min-w-[300px] bg-white shadow-md rounded-lg">
          <h4 className="">R {apartment?.price} / month</h4>
          <p className="mb-3 text-xs opacity-70">
            <span>
              {apartment?.bedrooms} bedroom(s) • {apartment?.bathrooms}{" "}
              bathroom(s)
            </span>
          </p>
          <Link
            to="/landlord"
            className="w-full btn btn-sm btn-outline btn-warning rounded-2xl"
          >
            Contact Landlord
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h3>Amenites</h3>
        <ul className="flex flex-wrap items-center gap-3 mt-3">
          {apartment?.amenities.map((item, index) => (
            <li
              key={index}
              className="p-2 px-3 text-sm border rounded-lg border-warning text-warning-content"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ListingDetailPage;
