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
      queryClient.invalidateQueries({ queryKey: ["apartment", apartmentId] });
      queryClient.invalidateQueries({ queryKey: ["user-apartments"] });
      queryClient.invalidateQueries({ queryKey: ["feature-apartments"] });
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
    },
  });
};

export default useUpdateApartment;
