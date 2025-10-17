import { useNavigate } from "react-router-dom";
import type { Apartment } from "../../../entities/Apartment";
import useDeleteApartment from "../../../hooks/useDeleteApartment";
import LoadingSpinner from "../../../components/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../../../store";

type Props = {
  apartment?: Apartment;
  onClose: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
};

const Modal = ({ ref, onClose, apartment }: Props) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { mutate, isPending } = useDeleteApartment();

  const handleDelete = () => {
    mutate(apartment?._id, {
      onError: (error) => {
        // ! 401 UNAUTHORIZE ERROR
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearAuth();
          onClose();
          navigate("/auth/login", {
            state: encodeURIComponent(error.response.data.message),
          });
        }

        // ! 404 NOT FOUND ERROR
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          onClose();
          toast.error(error.response.data.message);
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
