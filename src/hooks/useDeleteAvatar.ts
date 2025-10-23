import { useMutation } from "@tanstack/react-query";
import { deleteAvatar } from "../api/user";
import toast from "react-hot-toast";
import useAuthStore from "../store";
import axios from "axios";

const useDeleteAvatar = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: () => deleteAvatar(),
    onSuccess: (responseData) => {
      toast.success("avata deleted successfully");
      setUser(responseData.results);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          (error.response.status >= 400 || error.response.status < 500)
        ) {
          toast.error(error.message);
        }
      }
    },
  });
};

export default useDeleteAvatar;
