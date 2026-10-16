import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthPage from "../../../../src/pages/auth/AuthPage";

describe("<AuthPage/>", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /find your next home/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Choose your role to sign in or create an account./i),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /I'm a Tenant/i })).toHaveAttribute(
      "href",
      "/auth/register",
    );

    expect(
      screen.getByRole("link", { name: /I'm a Landlord/i }),
    ).toHaveAttribute("href", "/auth/register");

    expect(screen.getByRole("link", { name: /Sign in here/i })).toHaveAttribute(
      "href",
      "/auth/login",
    );
  });
});
