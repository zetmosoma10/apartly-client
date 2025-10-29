import { useQuery } from "@tanstack/react-query";
import type { Response } from "../../entities/Response";
import type { User } from "../../entities/User";
import { getUsers } from "../../api/user";

const useGetUsers = () => {
  return useQuery<Response<User[]>>({
    queryKey: ["admin", "users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetUsers;
