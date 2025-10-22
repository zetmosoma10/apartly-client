import type React from "react";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

const Modal = ({ onClose, ref }: Props) => {
  return (
    <dialog
      ref={ref}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <form className="modal-box">
        <h3 className="text-lg font-bold text-error">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete the account ? This action cannot be
          undone.
        </p>

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
          <button
            type="submit"
            className="btn bg-error text-white hover:border-error"
          >
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
