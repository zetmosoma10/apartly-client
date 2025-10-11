type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

const Modal = ({ ref, onClose }: Props) => {
  return (
    <dialog
      ref={ref}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete the ‘Apartment’ ? This action cannot
          be reversed
        </p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-neutral">Delete</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
