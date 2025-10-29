import { useMutation } from "@tanstack/react-query";
import type { registerCredentials } from "../../entities/User";
import { register } from "../../api/auth";
import toast from "react-hot-toast";
import useAuthStore from "../../store";

const useRegister = () => {
  const { setToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: registerCredentials) => register(credentials),
    onSuccess: (data) => {
      if (data.success) {
        setToken(data.token);
        setUser(data.results);
        toast.success("Account created successfully");
      }
    },
  });
};

export default useRegister;
