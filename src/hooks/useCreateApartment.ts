import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApartment } from "../api/apartments";
import toast from "react-hot-toast";

const useCreateApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createApartment(formData),
    onSuccess: () => {
      toast.success("Apartment created successfully");

      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "user"] });
    },
  });
};

export default useCreateApartment;
