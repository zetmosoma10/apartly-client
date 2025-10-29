import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../../api/user";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../../store";

const useUploadAvatar = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (avatar: FormData) => uploadAvatar(avatar),
    onSuccess: (responseData) => {
      toast.success("Avatar uploaded successfully");
      setUser(responseData.results);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    },
  });
};

export default useUploadAvatar;
