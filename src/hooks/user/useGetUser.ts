import { useQuery } from "@tanstack/react-query";
import type { Response } from "../../entities/Response";
import type { User } from "../../entities/User";
import { getUser } from "../../api/user";

const useGetUser = () => {
  return useQuery<Response<User>>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetUser;
