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

export const forgotPassword = async (email: string) => {
  const { data } = await api.post<{ success: boolean; message: string }>(
    "/auth/forgot-password",
    {
      email,
    },
  );
  return data;
};

type ResetPasswordPayload = {
  id: string | null;
  token: string | null;
  password: string;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.patch<AuthResponse>(
    "/auth/reset-password",
    { password: payload.password },
    { params: { token: payload.token, id: payload.id } },
  );
  return data;
};
