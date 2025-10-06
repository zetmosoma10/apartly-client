import { useQuery } from "@tanstack/react-query";
import { getApartment } from "../api/apartments";
import type { Response } from "../entities/Response";
import type { Apartment } from "../entities/Apartment";

const useGetApartment = (id?: string) => {
  return useQuery<Response<Apartment>>({
    queryKey: ["apartment", id],
    queryFn: () => getApartment(id),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetApartment;
