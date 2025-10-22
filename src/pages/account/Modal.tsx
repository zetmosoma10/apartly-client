import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import loginSchema from "../auth/login/loginSchema";
import Input from "../../components/Input";

const passwordSchema = loginSchema.pick({ password: true });

type FormData = z.infer<typeof passwordSchema>;

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

const Modal = ({ onClose, ref }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(passwordSchema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <dialog
      ref={ref}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete the account ? This action cannot be
          undone.
        </p>

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          autoFocus={true}
          register={register("password")}
          error={errors.password?.message}
        />

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="btn btn-neutral">
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
