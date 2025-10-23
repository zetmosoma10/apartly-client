import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { loginCredentials } from "../entities/User";
import { deleteAccount } from "../api/user";
import toast from "react-hot-toast";
import axios from "axios";

const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Pick<loginCredentials, "password">) =>
      deleteAccount(data),
    onSuccess: () => {
      toast.success("Account deleted successfully.");
      queryClient.clear();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response?.status >= 500) {
          toast.error(error.response.data.message);
        }
      }
    },
  });
};

export default useDeleteAccount;
