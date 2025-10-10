import { useMutation } from "@tanstack/react-query";
import type { loginCredentials } from "../entities/User";
import { login } from "../api/auth";

const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: loginCredentials) => login(credentials),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("apartly-token", data.token);
      }
    },
  });
};

export default useLogin;
