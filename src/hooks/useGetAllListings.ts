import { useQuery } from "@tanstack/react-query";
import { getAllListings } from "../api/apartments";
import type { ResponseApartment } from "../entities/Apartment";

const useGetAllListings = () => {
  return useQuery<ResponseApartment>({
    queryKey: ["listings"],
    queryFn: () => getAllListings(),
  });
};

export default useGetAllListings;
