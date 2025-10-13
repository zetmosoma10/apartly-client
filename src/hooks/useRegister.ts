import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import type { registerCredentials } from "../entities/User";
import useAuthStore from "../store";
import toast from "react-hot-toast";

const useRegister = () => {
  const { setToken } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: registerCredentials) => register(credentials),
    onSuccess: (data) => {
      if (data.success) {
        setToken(data.token);
        toast.success('Account created successfully')
      }
    },
  });
};

export default useRegister;
