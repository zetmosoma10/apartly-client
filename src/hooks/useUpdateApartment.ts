import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApartment } from "../api/apartments";
import toast from "react-hot-toast";

const useUpdateApartment = (apartmentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id?: string; data: FormData }) =>
      updateApartment({ id, data }),
    onSuccess: () => {
      toast.success("Apartment updated successfully");

      queryClient.invalidateQueries({ queryKey: ["apartments", apartmentId] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "user"] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "features"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
  });
};

export default useUpdateApartment;
