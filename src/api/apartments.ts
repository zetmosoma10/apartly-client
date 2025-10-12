import type { ApartmentUpdatePayload } from "../entities/Apartment";
import api from "./axiosInstance";

export const createApartment = async (formData: FormData) => {
  const { data } = await api.post("/apartments", formData);
  return data;
};

export const getAllApartments = async () => {
  const { data } = await api.get("/apartments");
  return data;
};

export const getAllUserApartments = async () => {
  const { data } = await api.get("/apartments/me");
  return data;
};

export const getApartment = async (id?: string) => {
  const { data } = await api.get(`/apartments/${id}`);
  return data;
};

export const updateApartment = async ({
  id,
  data,
}: {
  id?: string;
  data: ApartmentUpdatePayload;
}) => {
  const results = await api.patch(`/apartments/${id}`, data);
  return results.data;
};

export const deleteApartment = async (id?: string) => {
  const { data } = await api.delete(`/apartments/${id}`);
  return data;
};
