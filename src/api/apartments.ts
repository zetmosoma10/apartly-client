import api from "./axiosInstance";

export const createApartment = async (formData: FormData) => {
  const { data } = await api.post("/apartments", formData);
  return data;
};
