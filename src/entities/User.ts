export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: Date;
  role: "tenant" | "landlord" | "admin";
};

export type loginCredentials = {
  email: string;
  password: string;
};

export type registerCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: string;
  password: string;
};
