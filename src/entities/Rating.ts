import type { User } from "./User";

export type Rating = {
  _id: string;
  tenant: User;
  rating: number;
  comment: string;
  createdAt: Date;
}