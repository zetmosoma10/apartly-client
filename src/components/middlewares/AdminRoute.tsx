import { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store";

const AdminRoute = () => {
  const { user } = useAuthStore();
  console.log("Auth middlewares");

  useEffect(() => {
    if (user?.role !== "admin") toast.error("Access denied. Admin only");
  }, [user?.role]);

  if (user?.role !== "admin") {
    return <Navigate to=".." relative="path" />;
  }

  return <Outlet />;
};

export default AdminRoute;
