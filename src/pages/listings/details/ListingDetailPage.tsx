import { useParams, Link } from "react-router-dom";
import useGetApartment from "../../../hooks/useGetApartment";
import Badge from "../../../components/Badge";

const ListingDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetApartment(id);
  const apartment = data?.results;

  if(isLoading) return <p>Loading...</p>

  return (
    <section className="w-full mx-auto md:max-w-5xl">
      <h2>{apartment?.title}</h2>
      <p className="text-sm md:text-base opacity-70">
        {apartment?.address}, {apartment?.city}
      </p>
      <Badge status={apartment!.status} />
      <div className="grid sm:grid-cols-6 gap-3 mt-4 md:mt-5 ">
        <div className="col-span-4">
          <img
            src={apartment?.images[0].url}
            alt="apartment image"
            className="h-full object-cover rounded-lg "
          />
        </div>
        <div className="col-span-2  grid gap-3">
          <img
            src={apartment?.images[1].url}
            alt="apartment image"
            className="object-cover rounded-lg "
          />
          <img
            src={apartment?.images[2].url}
            alt="apartment image"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-cols sm:flex-row sm:justify-between mt-5">
        <div>
          <h3>Descriptions</h3>
          <p className="opacity-70 leading-tight">{apartment?.description}</p>
        </div>
        <div className="border p-4 min-w-[300px] bg-white shadow-md rounded-lg">
          <h4 className="text-base">R {apartment.price} / month</h4>
          <p className="text-xs opacity-70 mb-2">
            <span>{apartment.bedrooms} bedroom(s) . {apartment.bathrooms} bathroom(s)</span>
          </p>
          <Link
            to="/landlord" 
            className="btn btn-sm btn-outline btn-warning w-full rounded-2xl"
          >
          Contact Landlord
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h4>Amenites</h4>
        <ul className="flex items-center flex-wrap gap-3 mt-3">
          {apartment?.amenities.map((item, index) => (
            <li
              key={index}
              className="text-sm p-2 px-3 border border-warning rounded-lg text-warning-content"
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
