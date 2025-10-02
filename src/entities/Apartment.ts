export type Apartment = {
  _id: string;
  address: string;
  status: "available" | "rented" | "maintenance";
  images: {
    _id: string;
    url: string;
  }[];
};

export type ResponseApartment = {
  success: boolean;
  count: number;
  apartments: Apartment[];
};
