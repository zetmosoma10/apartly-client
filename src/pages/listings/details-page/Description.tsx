import { useRef } from "react";
import type { User } from "../../../entities/User";
import ExpandableText from "../../../components/ExpandableText";
import LandlordModal from "./LandlordModal";

type Props = {
  description?: string;
  price?: string;
  bedrooms?: string;
  bathrooms?: string;
  landlord?: User;
};

const Description = ({
  price,
  bedrooms,
  bathrooms,
  description,
  landlord,
}: Props) => {
  const landlordRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="flex flex-col gap-6 mt-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h3>Descriptions</h3>
          <ExpandableText>{description}</ExpandableText>
        </div>
        <div className="border p-4 min-w-[300px] max-w-[400px] bg-white shadow-md rounded-lg">
          <h4 className="">R {price} / month</h4>
          <p className="mb-3 text-xs opacity-70">
            <span>
              {bedrooms} bedroom(s) • {bathrooms} bathroom(s)
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

      {/* LANDLORD MODAL */}
      <LandlordModal
        ref={landlordRef}
        onClose={() => landlordRef?.current?.close()}
        landlord={landlord}
      />
    </>
  );
};

export default Description;
