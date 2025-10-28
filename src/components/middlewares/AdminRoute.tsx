import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store";
import toast from "react-hot-toast";

const AdminRoute = () => {
  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    toast.error("Access denied. Admin only");
    return <Navigate to=".." relative="path" />;
  }

  return <Outlet />;
};

export default AdminRoute;
