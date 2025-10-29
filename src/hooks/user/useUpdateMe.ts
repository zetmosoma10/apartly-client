import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../entities/User";
import { updateMe } from "../../api/user";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../../store";

const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (
      user: Pick<User, "firstName" | "lastName" | "email" | "phone">
    ) => updateMe(user),
    onSuccess: (responseData) => {
      if (responseData.success) {
        queryClient.setQueryData(["user"], responseData);
        setUser(responseData.results);
        toast.success("User updated.");
      }
    },

    onError: (error) => {
      // ! 404 & 400 ERROR
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404 || error.response?.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    },
  });
};

export default useUpdateMe;
