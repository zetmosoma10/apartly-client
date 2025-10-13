import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApartment } from "../api/apartments";
import type { ApartmentUpdatePayload } from "../entities/Apartment";
import toast from "react-hot-toast";

const useUpdateApartment = (apartmentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id?: string; data: ApartmentUpdatePayload }) =>
      updateApartment({ id, data }),
    onSuccess: () => {
      toast.success("Apartment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["apartment", apartmentId] });
    },
  });
};

export default useUpdateApartment;
