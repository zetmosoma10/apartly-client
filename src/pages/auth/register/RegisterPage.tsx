import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../../components/Input";
import registerSchema from "./registerSchema";
import axios from "axios";
import { useState } from "react";
import useRegister from "../../../hooks/useRegister";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../../../components/loadingIndicators/LoadingSpinner";

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [expectedError, setExpectedError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (data: FormData) => {
    const formData = data;
    if (location.state.role === "landlord") formData.role = "landlord";
    if (location.state.role === "tenant") formData.role = "tenant";

    mutate(formData, {
      onSuccess: () => {
        // * REDIRECT USER TO HOME
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
    <div className="min-h-screen py-20">
      <div className="w-11/12 p-8 mx-auto bg-white border rounded-md shadow-lg sm:w-3/4 md:w-1/2 ">
        <div className="mb-4 space-y-2 text-center ">
          <h2 className="text-xl font-bold text-black md:text-2xl">Sign up</h2>
          <p className="text-base text-black dark:text-WHITE">
            Already have an account?{" "}
            <Link className="text-warning hover:underline" to="/auth/login">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {expectedError && <ErrorMessage errorMessage={expectedError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full mb-3 space-y-3 sm:space-y-0 sm:space-x-2 sm:grid-cols-2">
            <Input
              register={register("firstName")}
              error={errors.firstName?.message}
              id="firstName"
              autoFocus={true}
              label="First Name"
              placeholder="e.g John"
            />
            <Input
              register={register("lastName")}
              error={errors.lastName?.message}
              id="lastName"
              label="Last Name"
              placeholder="e.g Doe"
            />
          </div>
          <div className="mb-5 space-y-3">
            <Input
              register={register("email")}
              error={errors.email?.message}
              id="email"
              label="Email"
              placeholder="e.g johndoe@gmail.com"
            />
            <Input
              register={register("phone")}
              error={errors.phone?.message}
              id="phone"
              label="Phone"
              placeholder="e.g 086001011"
            />
            <Input
              register={register("password")}
              error={errors.password?.message}
              id="password"
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            <Input
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <button disabled={isPending} className="w-full btn-main ">
            Sign up
            {isPending && <LoadingSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
