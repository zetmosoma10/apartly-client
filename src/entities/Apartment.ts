export type Apartment = {
  _id: string;
  city: string;
  title: string;
  price: string;
  status: Status;
  address: string;
  createdAt: Date;
  bedrooms: string;
  bathrooms: string;
  description: string;
  type: ApartmentType;
  amenities: string[];
  images: {
    _id: string;
    url: string;
  }[];
};

export type ApartmentUpdatePayload = {
  city?: string;
  title?: string;
  price?: number;
  status?: Status;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  type?: ApartmentType;
  amenities?: string;
};

export type ApartmentType =
  | "1-bedroom"
  | "2-bedrooms"
  | "3-bedrooms"
  | "studio"
  | "bachelor"
  | "other";

export type Status = "available" | "rented" | "maintenance";
