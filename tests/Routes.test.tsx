import { screen } from "@testing-library/react";
import { mockApartment } from "./mocks/data";
import { navigateTo } from "./utils";

describe("Routes", () => {
  it("should render home page for /", () => {
    navigateTo("/");

    expect(
      screen.getByRole("heading", { name: /find your perfect home/i }),
    ).toBeInTheDocument();
  });

  it("should render apartments page for /apartments", () => {
    navigateTo("/apartments");

    expect(
      screen.getByRole("heading", { name: /Apartments/i }),
    ).toBeInTheDocument();
  });

  it("should render apartments detail page for /apartments/:id ", async () => {
    navigateTo(`/apartments/${mockApartment._id}`);

    expect(
      await screen.findByRole("heading", { name: mockApartment.title }),
    ).toBeInTheDocument();
  });

  it("should should render 404 page for invalid routes", () => {
    navigateTo("/not-found");

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });
});
