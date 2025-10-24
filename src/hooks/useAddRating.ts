import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRating } from "../api/apartments";
import toast from "react-hot-toast";
import axios from "axios";

type args = {
  id?: string;
  review: {
    rating?: number | null;
    comment?: string | null;
  };
};

const useAddRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: args) => addRating(data),
    onSuccess: async (responseData) => {
      toast.success("Review added.");
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

export default useAddRating;
