import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAccount } from "../api/user";
import axios from "axios";
import toast from "react-hot-toast";

const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserAccount(userId),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      }
    },
    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "apartments"],
      });
    },
  });
};

export default useDeleteUserAccount;
