import { useMutation } from "@tanstack/react-query";
import type { loginCredentials } from "../entities/User";
import { login } from "../api/auth";
import useAuthStore from "../store";

const useLogin = () => {
  const { setToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: loginCredentials) => login(credentials),
    onSuccess: (data) => {
      if (data.success) {
        setToken(data.token);
        setUser(data.results);
      }
    },
  });
};

export default useLogin;
