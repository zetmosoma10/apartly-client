import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";
import type { Response } from "../entities/Response";
import type { User } from "../entities/User";

const useGetUser = () => {
  return useQuery<Response<User>>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetUser;
