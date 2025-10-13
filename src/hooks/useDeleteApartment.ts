import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartment } from "../api/apartments";

const useDeleteApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) => deleteApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({ queryKey: ["user-apartments"] });
    },
  });
};

export default useDeleteApartment;
