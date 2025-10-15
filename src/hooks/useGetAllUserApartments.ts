import { useQuery } from "@tanstack/react-query";
import type { Response } from "../entities/Response";
import type { Apartment } from "../entities/Apartment";
import { getAllUserApartments } from "../api/apartments";

const useGetAllUserApartments = (searchParams: URLSearchParams) => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["user-apartments", searchParams.toString()],
    queryFn: () => getAllUserApartments(searchParams),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAllUserApartments;
