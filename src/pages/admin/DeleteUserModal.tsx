import axios from "axios";
import LoadingSpinner from "../../components/loadingIndicators/LoadingSpinner";
import type { User } from "../../entities/User";
import useDeleteUserAccount from "../../hooks/useDeleteUserAccount";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store";

type Props = {
  user: User | null;
  onClose: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
};

const DeleteUserModal = ({ onClose, ref, user }: Props) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { mutate, isPending } = useDeleteUserAccount();
  const userId = user?._id as string;

  const onDeleteUser = () => {
    mutate(userId, {
      onSuccess: () => onClose(),
      onError: (error) => {
        // ! 401 UNAUTHORIZE ERROR
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          clearAuth();
          onClose();
          navigate("/auth/login", {
            state: encodeURIComponent(error.response.data.message),
          });
        }
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
          <span className="font-medium">
            {" "}
            {user?.firstName} {user?.lastName}
          </span>
          ’ ? This action cannot be reversed
        </p>
        <div className="modal-action">
          <button disabled={isPending} className="btn" onClick={onClose}>
            Close
          </button>
          <button
            disabled={isPending}
            onClick={onDeleteUser}
            className="btn btn-neutral disabled:text-black"
          >
            Delete
            {isPending && <LoadingSpinner />}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteUserModal;
