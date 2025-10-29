import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";
import loginSchema from "./loginSchema";
import axios from "axios";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../../../components/loadingIndicators/LoadingSpinner";
import useLogin from "../../../hooks/auth/useLogin";

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const [expectedError, setExpectedError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: FormData) => {
    if (location.state) {
      location.state = "";
    }

    mutate(data, {
      onSuccess: () => {
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
        <div className="mb-4 space-y-2 text-center">
          <h2 className="text-xl font-bold">Sign in</h2>
          <p className="text-base">
            Don't have account yet?{" "}
            <Link className="text-warning hover:underline" to="/auth">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Erver error */}
        {expectedError && <ErrorMessage errorMessage={expectedError} />}

        {/* REDIRECT ERROR MESSAGE */}
        {location.state && (
          <ErrorMessage errorMessage={decodeURIComponent(location.state)} />
        )}

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
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              register={register("password")}
              error={errors.password?.message}
            />
          </div>
          <button disabled={isPending} className="w-full btn-main">
            Sign in
            {isPending && <LoadingSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
