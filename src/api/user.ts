import type { Response } from "../entities/Response";
import type { User } from "../entities/User";
import api from "./axiosInstance";

export const getUser = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (
  user: Pick<User, "firstName" | "lastName" | "email" | "phone">
) => {
  const { data } = await api.patch<Response<User>>("/users/me/edit", user);
  return data;
};
