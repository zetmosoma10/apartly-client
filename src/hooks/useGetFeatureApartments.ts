import { useQuery } from "@tanstack/react-query";
import type { Response } from "../entities/Response";
import type { Apartment } from "../entities/Apartment";
import { getFeatureApartments } from "../api/apartments";

const useGetFeatureApartments = () => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["apartments", "features"],
    queryFn: () => getFeatureApartments(),
    staleTime: 1000 * 60 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 60,
  });
};

export default useGetFeatureApartments;
