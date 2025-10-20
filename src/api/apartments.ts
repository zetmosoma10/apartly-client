import api from "./axiosInstance";

export const createApartment = async (formData: FormData) => {
  const { data } = await api.post("/apartments", formData);
  return data;
};

export const getAllApartments = async (searchParams: URLSearchParams) => {
  const params = Object.fromEntries(searchParams.entries());

  const { data } = await api.get("/apartments", { params });
  return data;
};

export const getAllUserApartments = async (searchParams: URLSearchParams) => {
  const params = Object.fromEntries(searchParams.entries());

  const { data } = await api.get("/apartments/me", { params });
  return data;
};

export const getApartment = async (id?: string) => {
  const { data } = await api.get(`/apartments/${id}`);
  return data;
};

export const getFeatureApartments = async () => {
  const { data } = await api.get("/apartments/features");
  return data;
};

export const updateApartment = async ({
  id,
  data,
}: {
  id?: string;
  data: FormData;
}) => {
  const results = await api.patch(`/apartments/${id}`, data);
  return results.data;
};

export const deleteApartment = async (id?: string) => {
  const { data } = await api.delete(`/apartments/${id}`);
  return data;
};
