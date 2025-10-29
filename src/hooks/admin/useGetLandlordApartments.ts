import { useQuery } from "@tanstack/react-query";
import type { Response } from "../../entities/Response";
import type { Apartment } from "../../entities/Apartment";
import { getAllLandlordApartments } from "../../api/apartments";

const useGetLandlordApartments = (landlordId: string) => {
  return useQuery<Response<Apartment[]>>({
    queryKey: ["admin", "apartments", landlordId],
    queryFn: () => getAllLandlordApartments(landlordId),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetLandlordApartments;
