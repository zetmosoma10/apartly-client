export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: Date;
};

export type loginCredentials = {
  email: string;
  password: string;
};
