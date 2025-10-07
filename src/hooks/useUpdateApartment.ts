import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApartment } from "../api/apartments";
import type { ApartmentUpdatePayload } from "../entities/Apartment";

const useUpdateApartment = (apartmentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id?: string; data: ApartmentUpdatePayload }) =>
      updateApartment({ id, data }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["apartment", apartmentId] }),
  });
};

export default useUpdateApartment;
