import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import forgotPasswordSchema from "./forgotPasswordSchema";
import axios from "axios";
import toast from "react-hot-toast";
import useForgotPassword from "../../../hooks/auth/useForgotPassword";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../../../components/loadingIndicators/LoadingSpinner";

type FormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(forgotPasswordSchema) });

  const [expectedError, setExpectedError] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (data: FormData) => {
    setExpectedError("");

    mutate(data.email, {
      onSuccess: () => {
        reset();
        toast.success(
          "We have sent you an email with instructions to reset your password",
        );
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500 &&
            error.response.status !== 404
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
          <h2 className="text-xl font-bold md:text-2xl">Forgot Password?</h2>
          <p className="text-base">
            Remember your password?{" "}
            <Link className="text-warning hover:underline" to="/auth/login">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Expected error */}
        {expectedError && <ErrorMessage errorMessage={expectedError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email"
              autoFocus={true}
              placeholder="e.g johndoe@gmail.com"
              register={register("email")}
              error={errors.email?.message}
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

export default ForgotPasswordPage;
