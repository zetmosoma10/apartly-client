import type { Apartment } from "../../src/entities/Apartment";

// Mock mock apartment object satisfying the type requirements
export const mockApartment: Apartment = {
  _id: "apt-123",
  city: "Johannesburg",
  title: "Modern Loft Apartment",
  price: "8500",
  status: "available",
  address: "123 Main St",
  landlord: {
    _id: "lnd-123",
    avatar: { url: "avatar.jpeg" },
    email: "web@gmail.com",
    firstName: "James",
    lastName: "Bob",
    phone: "00212314",
    role: "landlord",
    createdAt: new Date(),
  },
  createdAt: new Date(),
  bedrooms: "1",
  bathrooms: "1",
  description: "A lovely loft.",
  totalRatings: 0,
  averageRatings: 0,
  ratings: [
    {
      _id: "123",
      comment: "comment",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      tenant: {
        _id: "123",
        avatar: { url: "12" },
        email: "z@gmail.com",
        firstName: "Zeee",
        lastName: "mososo",
        phone: "0921345451",
        role: "tenant",
        createdAt: new Date(),
      },
    },
  ],
  type: "studio",
  amenities: ["WiFi"],
  images: [
    { _id: "img-1", url: "https://example.com/image.jpg" },
    { _id: "img-2", url: "https://example.com/image.jpg" },
    { _id: "img-3", url: "https://example.com/image.jpg" },
  ],
  coordinates: { lat: 0, lng: 0 },
};
