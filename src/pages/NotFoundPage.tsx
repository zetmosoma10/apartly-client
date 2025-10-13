import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="max-w-[50rem] flex flex-col mx-auto size-full">
        <main className="flex flex-col items-center">
          <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
            <h1 className="block font-bold text-7xl sm:text-9xl">404</h1>
            <p className="mt-3 text-black text-opacity-70">
              Oops, something went wrong.
            </p>
            <p className="text-black text-opacity-70 mb-4">
              Sorry, we couldn't find your page.
            </p>

            <button
              onClick={() => navigate("/", { replace: true})}
              className="btn-main place-self-center"
            >
              Back to Home
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
