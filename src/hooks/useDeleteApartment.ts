import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartment } from "../api/apartments";

const useDeleteApartment = (apartmentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) => deleteApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments", apartmentId] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "user"] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "features"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
  });
};

export default useDeleteApartment;
