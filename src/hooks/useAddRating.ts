import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRating } from "../api/apartments";
import toast from "react-hot-toast";
import axios from "axios";

const useAddRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, rating }: { id?: string; rating: number | null }) =>
      addRating({ id, rating }),
    onSuccess: async (responseData) => {
      toast.success("Rating added.");
      await queryClient.setQueryData(
        ["apartment", responseData.results._id],
        responseData
      );
    },

    onError: (error) => {
      // ! 404 NOT FOUND ERROR
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error(error.response.data.message);
      }
    },
  });
};

export default useAddRating;
