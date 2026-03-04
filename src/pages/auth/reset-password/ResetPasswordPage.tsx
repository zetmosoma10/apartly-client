import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import axios from "axios";
import resetPasswordSchema from "./resetPasswordSchema";
import useResetPassword from "../../../hooks/auth/useResetPassword";
import LoadingSpinner from "../../../components/loadingIndicators/LoadingSpinner";
import ErrorMessage from "../ErrorMessage";

type FormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [expectedError, setExpectedError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const onSubmit = (data: FormData) => {
    setExpectedError("");

    const payload = {
      id,
      token,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully");

        // * REDIRECT TO HOME
        navigate("/", { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            setExpectedError(error.response.data.message);
          } else if (error.response && error.response.status >= 500) {
            toast.error(error.response.data.message);
          }
        }
      },
    });
  };

  return (
    <div className="h-screen pt-20">
      <div className="w-11/12 p-8 mx-auto bg-white border rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3 ">
        <div className="mb-5 space-y-2 text-center">
          <h2 className="text-xl font-bold md:text-2xl">Reset Password</h2>
          <p className="text-base text-black/60">
            Please enter your new password
          </p>
        </div>

        {expectedError && <ErrorMessage errorMessage={expectedError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="password"
              label="Password"
              type="password"
              autoFocus={true}
              placeholder="•••••••••"
              register={register("password")}
              error={errors.password?.message}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="•••••••••"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>
          <button disabled={isPending} className="w-full mt-5 btn-main">
            {isPending ? <LoadingSpinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
