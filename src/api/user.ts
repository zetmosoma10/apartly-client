import type { Response } from "../entities/Response";
import type { loginCredentials, User } from "../entities/User";
import api from "./axiosInstance";

export const getUser = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (
  user: Pick<User, "firstName" | "lastName" | "email" | "phone">
) => {
  const { data } = await api.patch<Response<User>>("/users/me", user);
  return data;
};

export const deleteAccount = async (
  data: Pick<loginCredentials, "password">
) => {
  const res = await api.post("/users/me", data);
  return res.data;
};

export const uploadAvatar = async (avatar: FormData) => {
  const { data } = await api.patch<Response<User>>("/users/me/avatar", avatar);
  return data;
};

export const deleteAvatar = async () => {
  const { data } = await api.delete<Response<User>>("/users/me/avatar");
  return data;
};

// ? ADMIN

export const getUsers = async (searchParams: URLSearchParams) => {
  const params = Object.fromEntries(searchParams.entries());

  const { data } = await api.get("/users/admin", { params });
  return data;
};

export const deleteUserAccount = async (userId: string) => {
  const { data } = await api.delete(`/users/${userId}/admin`);
  return data;
};
