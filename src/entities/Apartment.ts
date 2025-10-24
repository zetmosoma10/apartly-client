import type { User } from "./User";
import type { Rating } from "./Rating";

export type Apartment = {
  _id: string;
  city: string;
  title: string;
  price: string;
  status: Status;
  address: string;
  landlord: User;
  createdAt: Date;
  bedrooms: string;
  bathrooms: string;
  description: string;
  totalRatings: number;
  averageRatings: number;
  ratings: Rating[];
  type: ApartmentType;
  amenities: string[];
  images: {
    _id: string;
    url: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type ApartmentType =
  | "1-bedroom"
  | "2-bedrooms"
  | "3-bedrooms"
  | "studio"
  | "bachelor"
  | "other";

export type Status = "available" | "rented" | "maintenance";


