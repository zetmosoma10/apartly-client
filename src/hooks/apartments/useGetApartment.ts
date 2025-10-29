import { useQuery } from "@tanstack/react-query";
import type { Response } from "../../entities/Response";
import type { Apartment } from "../../entities/Apartment";
import { getApartment } from "../../api/apartments";

const useGetApartment = (id?: string) => {
  return useQuery<Response<Apartment>>({
    queryKey: ["apartments", id],
    queryFn: () => getApartment(id),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetApartment;
