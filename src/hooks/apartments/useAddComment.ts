import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { addComment } from "../../api/apartments";

const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comment }: { id?: string; comment: string }) =>
      addComment({ id, comment }),

    onSuccess: async (responseData) => {
      toast.success("Comment added.");
      await queryClient.setQueryData(
        ["apartments", responseData.results._id],
        responseData
      );
    },

    onError: (error) => {
      // ! 404 & 400 ERROR
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 400)
      ) {
        toast.error(error.response.data.message);
      }
    },
  });
};

export default useAddComment;
