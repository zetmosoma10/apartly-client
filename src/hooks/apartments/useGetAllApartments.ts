import { useQuery } from "@tanstack/react-query";
import type { Apartment } from "../../entities/Apartment";
import type { Response } from "../../entities/Response";
import { getAllApartments } from "../../api/apartments";

const useGetAllApartments = (searchParams: URLSearchParams) => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["apartments", searchParams.toString()],
    queryFn: () => getAllApartments(searchParams),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAllApartments;
