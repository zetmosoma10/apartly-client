import { FiMail, FiPhone } from "react-icons/fi";
import type { User } from "../../../entities/User";
import dayjs from "dayjs";

type Props = {
  landlord?: User;
  onClose: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
};

const LandlordModal = ({ onClose, ref, landlord }: Props) => {
  const { avatar, createdAt, email, firstName, lastName, phone, role } =
    landlord as User;

  return (
    <dialog ref={ref} id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
          >
            ✕
          </button>
        </form>
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src={avatar?.url || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-32 h-32 rounded-full object-cover border-2 border-warning"
          />
          <h2 className="mt-4 text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            {firstName} {lastName}
          </h2>
          <span className="mt-1 text-sm px-3 py-1 rounded-full bg-warning text-white  capitalize">
            {role}
          </span>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <FiPhone className="w-5 h-5 text-warning" />
            <span className="text-black text-opacity-70">{phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FiMail className="w-5 h-5 text-warning" />
            <span className="text-black text-opacity-70">{email}</span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="text-sm text-black text-opacity-70  text-center border-t border-neutral-200  pt-4">
          Joined on {dayjs(createdAt).format("DD MMM YYYY")}
        </div>
      </div>
    </dialog>
  );
};

export default LandlordModal;
