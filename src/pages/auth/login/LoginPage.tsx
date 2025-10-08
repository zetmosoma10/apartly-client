import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";
import loginSchema from "./loginSchema";

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="h-screen pt-20">
      <div className="w-11/12 p-8 mx-auto rounded-lg shadow-lg border bg-white sm:w-3/4 md:w-1/2 lg:w-1/3 ">
        <div className="mb-4 space-y-2 text-center">
          <h2 className="text-xl font-bold">Sign in</h2>
          <p className="text-base">
            Don't have account yet?{" "}
            <Link className="text-warning hover:underline" to="/register">
              Sign up here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email"
              placeholder="Enter email"
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
          <div className="mt-2 mb-4 text-end">
            <Link
              className="text-sm text-warning hover:underline"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <button className="btn-main w-full">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
