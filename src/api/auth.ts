import type { AuthResponse } from "../entities/Response";
import type { loginCredentials } from "../entities/User";
import api from "./axiosInstance";

export const login = async (credentials: loginCredentials) => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  return data;
};
