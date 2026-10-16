import { screen } from "@testing-library/react";
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
});
