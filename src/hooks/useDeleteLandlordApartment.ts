import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLandlordApartment } from "../api/apartments";

const useDeleteLandlordApartment = (apartmentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) => deleteLandlordApartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments", apartmentId] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "user"] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "features"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "apartments"],
      });
    },
  });
};

export default useDeleteLandlordApartment;
