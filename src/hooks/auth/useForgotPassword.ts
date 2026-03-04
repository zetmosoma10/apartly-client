import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/auth";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
};

export default useForgotPassword;
