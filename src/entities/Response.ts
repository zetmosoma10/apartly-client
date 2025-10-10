export type Response<T> = {
  success: boolean;
  count?: number;
  token?: string;
  results: T;
};
