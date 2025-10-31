import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Badge from "../../../components/Badge";
import BackButton from "../../../components/BackButton";
import DeleteModal from "./DeleteModal";
import LandlordModal from "./LandlordModal";
import useAuthStore from "../../../store";
import axios from "axios";
import ApartmentMap from "../ApartmentMap";
import ExpandableText from "../../../components/ExpandableText";
import ApartmentDetailsSkeleton from "../../../components/loadingIndicators/ApartmentDetailsSkeleton";
import Rating from "./Rating";
import Comments from "./Comments";
import useGetApartment from "../../../hooks/apartments/useGetApartment";
import ImageGrid from "./ImageGrid";

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteRef = useRef<HTMLDialogElement>(null);
  const landlordRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuthStore();
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
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <h2>{apartment?.title}</h2>
          <p className="text-base md:text-lg opacity-70">
            {apartment?.address}, {apartment?.city}
          </p>
          <Rating apartment={apartment} />
          <Badge status={apartment!.status} />
        </div>

        {user?._id === apartment?.landlord._id && (
          <div className="flex flex-col gap-y-3">
            <Link
              to={`/apartments/listings/${apartment?._id}/edit`}
              className="btn btn-neutral btn-sm md:btn-md rounded-3xl text-nowrap"
            >
              <RiEdit2Fill />
              Edit Apartment
            </Link>
            <button
              className="text-white btn btn-error btn-sm md:btn-md rounded-3xl text-nowrap"
              onClick={() => deleteRef.current?.showModal()}
            >
              <RiDeleteBin4Fill />
              Delete Apartment
            </button>
          </div>
        )}
      </div>

      {/* IMAGE GRID */}
      <ImageGrid images={apartment?.images} />

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-6 mt-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h3>Descriptions</h3>
          <ExpandableText>{apartment?.description as string}</ExpandableText>
        </div>
        <div className="border p-4 min-w-[300px] max-w-[400px] bg-white shadow-md rounded-lg">
          <h4 className="">R {apartment?.price} / month</h4>
          <p className="mb-3 text-xs opacity-70">
            <span>
              {apartment?.bedrooms} bedroom(s) • {apartment?.bathrooms}{" "}
              bathroom(s)
            </span>
          </p>
          <button
            onClick={() => landlordRef?.current?.showModal()}
            className="w-full btn btn-sm btn-outline btn-warning rounded-2xl"
          >
            Contact Landlord
          </button>
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

      {/* APARTMENT MAP */}
      <div className="mt-6 space-y-3">
        <h3>Location</h3>
        <ApartmentMap coordinates={apartment?.coordinates} />
      </div>

      {/* REVIEW SECTION */}
      <Comments apartment={apartment} />

      {/* DELETE MODAL */}
      <DeleteModal
        ref={deleteRef}
        onClose={() => deleteRef.current?.close()}
        apartment={apartment}
      />

      {/* LANDLORD MODAL */}
      <LandlordModal
        ref={landlordRef}
        onClose={() => landlordRef?.current?.close()}
        landlord={apartment?.landlord}
      />
    </section>
  );
};

export default ListingDetailPage;
