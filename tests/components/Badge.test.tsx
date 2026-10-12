import { render, screen } from "@testing-library/react";
import Badge from "../../src/components/Badge";

describe("<Badge/>", () => {
  it("should render available status with correct styling", () => {
    render(<Badge status="available" />);
    const text = screen.getByText(/available/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("bg-emerald-100", "text-emerald-700");
  });

  it("should render rented status with correct styling", () => {
    render(<Badge status="rented" />);
    const text = screen.getByText(/rented/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("bg-rose-100", "text-rose-700");
  });

  it("should render maintenance status with correct styling", () => {
    render(<Badge status="maintenance" />);
    const text = screen.getByText(/maintenance/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("bg-amber-100", "text-amber-700");
  });
});
