import { useQuery } from "@tanstack/react-query";
import { getAllApartments } from "../api/apartments";
import type { Apartment } from "../entities/Apartment";
import type { Response } from "../entities/Response";

const useGetAllApartments = (searchParams: URLSearchParams) => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["apartments", searchParams.toString()],
    queryFn: () => getAllApartments(searchParams),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAllApartments;
