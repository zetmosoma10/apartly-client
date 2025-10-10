import type { Response } from "../entities/Response";
import type { loginCredentials, User } from "../entities/User";
import api from "./axiosInstance";

export const login = async (credentials: loginCredentials) => {
  const { data } = await api.post<Response<User>>("/auth/login", credentials);
  return data;
};
