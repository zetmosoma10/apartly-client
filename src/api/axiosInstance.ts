import axios from "axios";
import useAuthStore from "../store";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // !Network or connection error
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
    }
    // !401 unauthorized (maybe token expired)
    else if (error.response.status === 401) {
      toast.error("Session expired. Please log in again.");

      //  !clear token or redirect to login
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
    }
    // ! 404 not found
    else if (error.response.status === 404) {
      toast.error("Resource not found.");
    }
    // ! 500 internal server
    else if (error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    // ! Re-throw to let React Query handle it too
    return Promise.reject(error);
  }
);

export default api;
