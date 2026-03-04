import { Link } from "react-router-dom";
import Input from "../../../components/Input";

const ForgotPasswordPage = () => {
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

        <form>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email"
              autoFocus={true}
              placeholder="e.g johndoe@gmail.com"
            />
          </div>
          <button className="w-full mt-5 btn-main">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
