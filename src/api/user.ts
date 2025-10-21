import api from "./axiosInstance";

export const getUser = async () => {
  const { data } = await api.get("/user/me");
  return data;
};
