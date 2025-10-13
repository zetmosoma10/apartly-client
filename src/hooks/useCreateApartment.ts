import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApartment } from "../api/apartments";

const useCreateApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createApartment(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({ queryKey: ["user-apartments"] });
    },
  });
};

export default useCreateApartment;
