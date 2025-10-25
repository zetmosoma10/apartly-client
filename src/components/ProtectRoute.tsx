import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store";

const ProtectRoute = () => {
  const { user, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) return null;

  if (!user)
    return (
      <Navigate
        to="/auth/login"
        state={encodeURIComponent("You should login first")}
      />
    );

  return <Outlet />;
};

export default ProtectRoute;
