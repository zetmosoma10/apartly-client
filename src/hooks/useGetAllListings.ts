import { useQuery } from "@tanstack/react-query";
import { getAllListings } from "../api/apartments";
import type { Apartment } from "../entities/Apartment";
import type { Response } from "../entities/Response";

const useGetAllListings = () => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["listings"],
    queryFn: () => getAllListings(),
  });
};

export default useGetAllListings;
