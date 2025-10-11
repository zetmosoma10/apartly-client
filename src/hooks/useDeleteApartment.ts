import { useMutation } from "@tanstack/react-query";
import { deleteApartment } from "../api/apartments";

const useDeleteApartment = () => {
  return useMutation({
    mutationFn: (id?: string) => deleteApartment(id),
  });
};

export default useDeleteApartment;
