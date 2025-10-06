export type Apartment = {
  _id: string;
  address: string;
  status: Status;
  images: {
    _id: string;
    url: string;
  }[];
};

export type Status = "available" | "rented" | "maintenance";

export type ResponseApartment = {
  success: boolean;
  count: number;
  apartments: Apartment[];
};
