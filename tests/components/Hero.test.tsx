import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "../../src/components/Hero";

describe("<Hero/>", () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
  };

  it("should render correctly", () => {
    renderComponent();

    const heading = screen.getByRole("heading", {
      name: /Find Your Perfect Home/i,
    });
    const paragraph = screen.getByText(
      /Explore a wide range of apartments for rent in your desired location/i,
    );
    const inputSearch = screen.getByPlaceholderText(/Search apartments.../i);
    const button = screen.getByRole("button", { name: /search/i });

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
