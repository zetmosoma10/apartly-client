import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartment } from "../api/apartments";

const useDeleteApartment = (apartmentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) => deleteApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartment", apartmentId] });
      queryClient.invalidateQueries({ queryKey: ["user-apartments"] });
      queryClient.invalidateQueries({ queryKey: ["feature-apartments"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
  });
};

export default useDeleteApartment;
