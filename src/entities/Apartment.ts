export type Apartment = {
  _id: string;
  address: string;
  status: Status;
  createdAt: Date;
  images: {
    _id: string;
    url: string;
  }[];
};

export type Status = "available" | "rented" | "maintenance";


