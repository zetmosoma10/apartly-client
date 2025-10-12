import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import Input from "../../../components/Input";
import registerSchema from "./registerSchema";

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    const formData = data;
    if (location.state.role === "landlord") formData.role = "landlord";
    if (location.state.role === "tenant") formData.role = "tenant";

    console.log(formData);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="w-11/12 p-8 mx-auto rounded-md shadow-lg border bg-white sm:w-3/4 md:w-1/2 ">
        <div className="mb-4 space-y-2 text-center ">
          <h2 className="text-xl font-bold text-black md:text-2xl">Sign up</h2>
          <p className="text-base text-black dark:text-WHITE">
            Already have an account?{" "}
            <Link className="text-warning hover:underline" to="/auth/login">
              Sign in here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full mb-3 space-y-3 sm:space-y-0 sm:space-x-2 sm:grid-cols-2">
            <Input
              register={register("firstName")}
              error={errors.firstName?.message}
              id="firstName"
              label="First Name"
              placeholder="Enter First Name"
            />
            <Input
              register={register("lastName")}
              error={errors.lastName?.message}
              id="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="mb-5 space-y-3">
            <Input
              register={register("email")}
              error={errors.email?.message}
              id="email"
              label="Email"
              placeholder="Enter email"
            />
            <Input
              register={register("phone")}
              error={errors.phone?.message}
              id="phone"
              label="Phone"
              placeholder="Enter phone number"
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

          <button className="w-full btn-main disabled:border-none">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
