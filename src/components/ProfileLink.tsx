import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store";
import { Link, useNavigate } from "react-router-dom";

const ProfileLink = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return (
    <div className="flex items-center justify-between px-3 py-1 space-x-3 border rounded-lg bg-base-300 ">
      <Link
        to="/account"
        className="p-2 font-medium tracking-[0.9px] text-sm uppercase bg-neutral rounded-full text-neutral-content"
      >
        <p>
          {user?.firstName[0]}
          {user?.lastName[0]}
        </p>
      </Link>
      <button
        className="text-sm hover:underline hover:text-error"
        onClick={() => {
          clearAuth();
          navigate("/");
          queryClient.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileLink;
