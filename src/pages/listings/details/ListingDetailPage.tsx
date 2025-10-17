import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin4Fill } from "react-icons/ri";
import useGetApartment from "../../../hooks/useGetApartment";
import Badge from "../../../components/Badge";
import BackButton from "../../../components/BackButton";
import Modal from "./Modal";
import useAuthStore from "../../../store";
import ApartmentDetailsSkeleton from "../../../skeletons/ApartmentDetailsSkeleton";
import axios from "axios";

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement>(null);
  const { user } = useAuthStore();

  const onOpen = () => {
    ref.current?.showModal();
  };

  const onClose = () => {
    ref.current?.close();
  };

  const { data, isLoading, error } = useGetApartment(id);
  const apartment = data?.results;

  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      navigate("/not-found", { replace: true });
    }
  }

  if (isLoading) return <ApartmentDetailsSkeleton />;

  return (
    <section className="max-container">
      <BackButton />
      <div className="flex justify-between gap-8">
        <div>
          <h2>{apartment?.title}</h2>
          <p className="text-base md:text-lg opacity-70">
            {apartment?.address}, {apartment?.city}
          </p>
          <Badge status={apartment!.status} />
        </div>

        {user?._id === apartment?.landlord && (
          <div className="flex flex-col gap-y-3">
            <Link
              to={`/apartments/listings/${apartment?._id}/edit`}
              className="btn btn-neutral btn-sm md:btn-md rounded-3xl text-nowrap"
            >
              <RiEdit2Fill />
              Edit Apartment
            </Link>
            <button
              className="btn btn-error btn-sm md:btn-md rounded-3xl text-nowrap text-white"
              onClick={onOpen}
            >
              <RiDeleteBin4Fill />
              Delete Apartment
            </button>
          </div>
        )}
      </div>

      {/* DELETE MODAL */}
      <Modal ref={ref} onClose={onClose} apartment={apartment} />

      {/* IMAGE GRID */}
      <div className="grid gap-2 mt-5 mb-8 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 h-[500px] sm:mt-8 sm:mb-12">
        <div
          className="overflow-hidden sm:col-span-2 sm:row-span-2 rounded-xl"
          style={{
            backgroundImage: `url(${apartment?.images[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="overflow-hidden sm:col-span-1 sm:row-span-1 rounded-xl"
          style={{
            backgroundImage: `url(${apartment?.images[1].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="overflow-hidden sm:col-span-1 sm:row-span-1 rounded-xl"
          style={{
            backgroundImage: `url(${apartment?.images[2].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col mt-5 gap-y-4 gap-x-3 sm:flex-row sm:justify-between">
        <div>
          <h3>Descriptions</h3>
          <p className="leading-tight opacity-70">{apartment?.description}</p>
        </div>
        <div className="border p-4 min-w-[300px] max-w-[400px] bg-white shadow-md rounded-lg">
          <h4 className="">R {apartment?.price} / month</h4>
          <p className="mb-3 text-xs opacity-70">
            <span>
              {apartment?.bedrooms} bedroom(s) • {apartment?.bathrooms}{" "}
              bathroom(s)
            </span>
          </p>
          <Link
            to="/"
            className="w-full btn btn-sm btn-outline btn-warning rounded-2xl"
          >
            Contact Landlord
          </Link>
        </div>
      </div>

      {/* AMENITES */}
      <div className="mt-6">
        <h3>Amenites</h3>
        <ul className="flex flex-wrap items-center gap-3 mt-3">
          {apartment?.amenities.map((item, index) => (
            <li
              key={index}
              className="px-2 py-1 text-xs border rounded-lg border-warning text-warning-content"
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
