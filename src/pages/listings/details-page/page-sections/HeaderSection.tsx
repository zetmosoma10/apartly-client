import { useRef } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import type { Apartment } from "../../../../entities/Apartment";
import useAuthStore from "../../../../store";
import Rating from "../Rating";
import Badge from "../../../../components/Badge";
import DeleteModal from "../DeleteModal";

type Props = {
  apartment?: Apartment;
};

const HeaderSection = ({ apartment }: Props) => {
  const deleteRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuthStore();

  return (
    <>
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
      <DeleteModal
        ref={deleteRef}
        onClose={() => deleteRef.current?.close()}
        apartment={apartment}
      />
    </>
  );
};

export default HeaderSection;
