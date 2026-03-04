import Input from "../../../components/Input";

const ResetPasswordPage = () => {
  return (
    <div className="h-screen pt-20">
      <div className="w-11/12 p-8 mx-auto bg-white border rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3 ">
        <div className="mb-5 space-y-2 text-center">
          <h2 className="text-xl font-bold md:text-2xl">Reset Password</h2>
          <p className="text-base text-black/60">
            Please enter your new password
          </p>
        </div>

        <form>
          <div className="space-y-4">
            <Input
              id="password"
              label="Password"
              autoFocus={true}
              placeholder="•••••••••"
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              autoFocus={true}
              placeholder="•••••••••"
            />
          </div>
          <button className="w-full mt-5 btn-main">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
