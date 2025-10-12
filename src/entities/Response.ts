export type Response<T> = {
  success: boolean;
  count: number;
  results: T;
};

export type AuthResponse = {
  success: boolean;
  token: string;
};
