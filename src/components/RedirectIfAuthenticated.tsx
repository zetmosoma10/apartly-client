import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store";

const RedirectIfAuthenticated = () => {
  const location = useLocation();
  const { user, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) return;

  if (user) {
    const prevPage = location.state?.from?.pathname || "/";
    return <Navigate to={prevPage} replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
