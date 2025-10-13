import { useQuery } from "@tanstack/react-query";
import { getAllApartments } from "../api/apartments";
import type { Apartment } from "../entities/Apartment";
import type { Response } from "../entities/Response";

const useGetAllApartments = () => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["apartments"],
    queryFn: () => getAllApartments(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAllApartments;
