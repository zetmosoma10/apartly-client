import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ApartmentCard from "../../src/components/ApartmentCard";
import { mockApartment } from "../mocks/data";

describe("<ApartmentCard/>", () => {
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
      <MemoryRouter initialEntries={["admin/users/:id/apartments"]}>
        <ApartmentCard apartment={mockApartment} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/admin/users/apartments/apt-123",
    );
  });
});
