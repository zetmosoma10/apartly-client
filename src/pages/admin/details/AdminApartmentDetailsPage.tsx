import { useRef, useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import type { Apartment } from "../../../entities/Apartment";
import BackButton from "../../../components/BackButton";
import Badge from "../../../components/Badge";
import ExpandableText from "../../../components/ExpandableText";
import ApartmentMap from "../../listings/ApartmentMap";
import Comments from "../../listings/details/Comments";
import DeleteModal from "../../listings/details/DeleteModal";
import ImageCarouselModal from "../../listings/details/ImageCarouselModal";
import Rating from "../../listings/details/Rating";
import useGetApartment from "../../../hooks/useGetApartment";
import ApartmentDetailsSkeleton from "../../../components/loadingIndicators/ApartmentDetailsSkeleton";

const AdminApartmentDetailsPage = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const { id } = useParams();
  const deleteRef = useRef<HTMLDialogElement>(null);
  const { data, isLoading } = useGetApartment(id);

  // * MODAL HANDLERS
  const onOpenDeleteModal = () => {
    deleteRef.current?.showModal();
  };

  const onCloseDeleteModal = () => {
    deleteRef.current?.close();
  };

  // * END OF MODAL HANDLERS

  const apartment = data?.results as Apartment;

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

        <div className="flex flex-col gap-y-3">
          <button
            onClick={onOpenDeleteModal}
            className="text-white btn btn-error btn-sm md:btn-md rounded-3xl text-nowrap"
          >
            <RiDeleteBin4Fill />
            Delete Apartment
          </button>
        </div>
      </div>

      {/* IMAGE GRID */}
      <div className="grid gap-2 mt-5 mb-8 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 h-[500px] sm:mt-8 sm:mb-12">
        <div
          className="overflow-hidden sm:col-span-2 sm:row-span-2 rounded-xl cursor-pointer"
          onClick={() => setIsCarouselOpen(true)}
          style={{
            backgroundImage: `url(${apartment?.images[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="overflow-hidden sm:col-span-1 sm:row-span-1 rounded-xl cursor-pointer"
          onClick={() => setIsCarouselOpen(true)}
          style={{
            backgroundImage: `url(${apartment?.images[1].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="overflow-hidden sm:col-span-1 sm:row-span-1 rounded-xl cursor-pointer"
          onClick={() => setIsCarouselOpen(true)}
          style={{
            backgroundImage: `url(${apartment?.images[2].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-6 mt-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h3>Descriptions</h3>
          <ExpandableText>{apartment?.description as string}</ExpandableText>
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
        onClose={onCloseDeleteModal}
        apartment={apartment}
      />

      {/* IMAGE CAROUSEL MODAL */}
      <ImageCarouselModal
        isOpen={isCarouselOpen}
        images={apartment?.images || []}
        onClose={() => setIsCarouselOpen(false)}
      />
    </section>
  );
};

export default AdminApartmentDetailsPage;
