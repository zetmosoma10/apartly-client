import { useNavigate } from "react-router-dom";
import type { Apartment } from "../../../entities/Apartment";
import useDeleteApartment from "../../../hooks/useDeleteApartment";
import LoadingSpinner from "../../../components/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  apartment?: Apartment;
  onClose: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
};

const Modal = ({ ref, onClose, apartment }: Props) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteApartment();

  const handleDelete = () => {
    mutate(apartment?._id, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            onClose();
            toast.error(error.response.data?.message);
          }
        }
      },
      onSuccess: () => {
        onClose();
        toast.success("Apartment deleted successfully");
        navigate("/apartments/listings", { replace: true });
      },
    });
  };

  return (
    <dialog
      ref={ref}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete the ‘
          <span className="font-medium"> {apartment?.title}</span>’ ? This
          action cannot be reversed
        </p>
        <div className="modal-action">
          <button className="btn" disabled={isPending} onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-neutral"
            disabled={isPending}
            onClick={handleDelete}
          >
            Delete
            {isPending && <LoadingSpinner />}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
