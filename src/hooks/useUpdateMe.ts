import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../entities/User";
import { updateMe } from "../api/user";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      user: Pick<User, "firstName" | "lastName" | "email" | "phone">
    ) => updateMe(user),
    onSuccess: (responseData) => {
      queryClient.setQueryData(["user"], responseData);
      toast.success("User updated.");
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
