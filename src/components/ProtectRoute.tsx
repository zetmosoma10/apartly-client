import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store";

const ProtectRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { user, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) return null;

  if (!user)
    return (
      <Navigate
        to="/auth/login"
        state={encodeURIComponent("You should login first")}
      />
    );

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/unauthorize" />;
  }

  return <Outlet />;
};

export default ProtectRoute;
