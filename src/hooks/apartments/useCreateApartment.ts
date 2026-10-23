import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createApartment } from "../../api/apartments";

const useCreateApartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => {
      console.log("title", formData.get("title"));
      console.log("Price", formData.get("price"));
      console.log("bedrooms", formData.get("bedrooms"));
      console.log("city", formData.get("city"));
      console.log("type", formData.get("type"));
      console.log("address", formData.get("address"));
      console.log("bathrooms", formData.get("bathrooms"));
      console.log("status", formData.get("status"));
      console.log("amenities", formData.get("amenities"));
      console.log("description", formData.get("description"));
      console.log("images", formData.get("images"));
      console.log("coordinates", formData.get("coordinates"));
      return createApartment(formData);
    },
    onSuccess: () => {
      toast.success("Apartment created successfully");

      queryClient.invalidateQueries({ queryKey: ["apartments"] });
      queryClient.invalidateQueries({ queryKey: ["apartments", "user"] });
    },
  });
};

export default useCreateApartment;
