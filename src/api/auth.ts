import type { AuthResponse } from "../entities/Response";
import type { loginCredentials, registerCredentials } from "../entities/User";
import api from "./axiosInstance";

export const login = async (credentials: loginCredentials) => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  return data;
};

export const register = async (credentials: registerCredentials) => {
  const { data } = await api.post<AuthResponse>("/auth/register", credentials);
  return data;
};
