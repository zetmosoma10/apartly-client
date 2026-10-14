import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ApartmentCard from "../../src/components/ApartmentCard";
import type { Apartment } from "../../src/entities/Apartment";

describe("<ApartmentCard/>", () => {
  // Mock mock apartment object satisfying the type requirements
  const mockApartment: Apartment = {
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
    ratings: [],
    type: "studio",
    amenities: ["WiFi"],
    images: [{ _id: "img-1", url: "https://example.com/image.jpg" }],
    coordinates: { lat: 0, lng: 0 },
  };

  it("should renders apartment details and standard client link correctly", () => {
    render(
      <MemoryRouter initialEntries={["/apartments"]}>
        <ApartmentCard apartment={mockApartment} />,
      </MemoryRouter>,
    );

    // Check text contents
    expect(screen.getByText("Modern Loft Apartment")).toBeInTheDocument();
    expect(screen.getByText("R 8500 / month")).toBeInTheDocument();
    expect(screen.getByText("Johannesburg")).toBeInTheDocument();
    expect(screen.getByText(/available/i)).toBeInTheDocument();

    // Check image
    expect(
      screen.getByRole("img", { name: /apartment preview/i }),
    ).toHaveAttribute("src", "https://example.com/image.jpg");

    // Check link destination for standard view
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/apartments/apt-123",
    );
  });

  it("should render admin link correctly", () => {
    render(
      <MemoryRouter initialEntries={["admin/users/lnd-123/apartments"]}>
        <ApartmentCard apartment={mockApartment} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/admin/users/apartments/apt-123",
    );
  });
});
