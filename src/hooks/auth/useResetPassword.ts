import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "../../api/auth";
import useAuthStore from "../../store";

const useResetPassword = () => {
  const { setToken, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      password: string;
      token: string | null;
      id: string | null;
    }) => resetPassword(payload),
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token);
        setUser(data.results);
      }
      queryClient.invalidateQueries();
    },
  });
};

export default useResetPassword;
