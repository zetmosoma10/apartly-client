import { useQuery } from "@tanstack/react-query";
import type { Response } from "../../entities/Response";
import type { User } from "../../entities/User";
import { getUsers } from "../../api/user";

const useGetUsers = (searchParams: URLSearchParams) => {
  return useQuery<Response<User[]>>({
    queryKey: ["admin", "users", searchParams.toString()],
    queryFn: () => getUsers(searchParams),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetUsers;
