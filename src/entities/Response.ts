import type { User } from "./User";

export type Response<T> = {
  success: boolean;
  count?: number;
  results: T;
  pagination?: PaginationType;
};

export type PaginationType = {
  currentPage: number;
  totalPages: number;
  currentCountPerPage: number;
  totalPerPage: number;
  totalDocuments: number;
  hasNextPage: boolean;
};

export type AuthResponse = {
  success: boolean;
  token: string;
  results: User;
};
