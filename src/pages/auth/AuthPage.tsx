import { Link } from "react-router-dom";

const AuthPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="text-center max-w-[430px]">
        <h1 className="font-extrabold text-5xl sm:text-6xl">
          Find Your <span className="text-warning">Next</span> Home
        </h1>
        <p className="opacity-70 mt-3">
          Choose your role to sign in or create an account.
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <Link
            to="/auth/register"
            className="btn btn-outline bg-white  hover:bg-warning hover:text-white rounded-3xl"
            state={{ role: "tenant" }}
          >
            I'm a Tenant
          </Link>
          <Link
            to="/auth/register"
            className="btn btn-outline bg-white  hover:bg-warning hover:text-white rounded-3xl"
            state={{ role: "landlord" }}
          >
            I'm a Landlord
          </Link>
        </div>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link className="text-warning hover:underline" to="/auth/login">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthPage;
