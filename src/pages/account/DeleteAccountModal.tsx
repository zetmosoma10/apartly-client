import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import loginSchema from "../auth/login/loginSchema";
import Input from "../../components/Input";
import LoadingSpinner from "../../components/loadingIndicators/LoadingSpinner";
import axios from "axios";
import ErrorMessage from "../auth/ErrorMessage";
import useAuthStore from "../../store";
import useDeleteAccount from "../../hooks/user/useDeleteAccount";

const passwordSchema = loginSchema.pick({ password: true });

type FormData = z.infer<typeof passwordSchema>;

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

const DeleteAccountModal = ({ onClose, ref }: Props) => {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteAccount();
  const { clearAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(passwordSchema) });

  const onSubmit = (data: FormData) => {
    setErrMessage("");

    mutate(data, {
      onSuccess: () => {
        navigate("/", { replace: true });
        clearAuth();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response && error.status === 400) {
            setErrMessage(error.response.data.message);
          }
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
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete the account ? This action cannot be
          undone.
        </p>

        {/* Expected error */}
        {errMessage && <ErrorMessage errorMessage={errMessage} />}

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
          <button
            disabled={isPending}
            type="button"
            className="btn"
            onClick={onClose}
          >
            Close
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-neutral disabled:text-black"
          >
            Delete
            {isPending && <LoadingSpinner />}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteAccountModal;
