import { useMutation } from "@tanstack/react-query";
import { createApartment } from "../api/apartments";

const useCreateApartment = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createApartment(formData),
  });
};

export default useCreateApartment;
