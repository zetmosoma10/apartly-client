import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NavBar from "../../src/components/navigation/NavBar";
import useAuthStore from "../../src/store";
import { mockAdminUser, mockLandlordUser, mockTenantUser } from "../mocks/data";

describe("<NavBar/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<NavBar />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => useAuthStore.setState({ user: null }));

  it("should render correctly for unauthenticated user", () => {
    renderComponent();

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/");
    expect(links[2]).toHaveAttribute("href", "/apartments");
    expect(links[3]).toHaveAttribute("href", "/auth");
  });

  it("should render account link for tenant user", () => {
    useAuthStore.setState({ user: mockTenantUser });
    renderComponent();

    expect(screen.getByRole("link", { name: /account/i })).toHaveAttribute(
      "href",
      "/account",
    );
  });

  it("should render listing link for landlord user", () => {
    useAuthStore.setState({ user: mockLandlordUser });
    renderComponent();

    expect(screen.getByRole("link", { name: /listings/i })).toHaveAttribute(
      "href",
      "/apartments/listings",
    );
  });

  it("should render admin link for admin user", () => {
    useAuthStore.setState({ user: mockAdminUser });
    renderComponent();

    expect(screen.getByRole("link", { name: /admin/i })).toHaveAttribute(
      "href",
      "/admin",
    );
  });

  it("should render login link for unauthenticated user", () => {
    renderComponent();

    expect(
      screen.getByRole("link", { name: /login \/ register/i }),
    ).toHaveAttribute("href", "/auth");
    expect(
      screen.queryByRole("button", { name: /logout/i }),
    ).not.toBeInTheDocument();
  });

  it("should render logout  button for authenticated user", async () => {
    useAuthStore.setState({ user: mockTenantUser });

    renderComponent();

    expect(
      screen.queryByRole("link", { name: /login \/ register/i }),
    ).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /logout/i }),
    ).toBeInTheDocument();
  });

  it("should logout the user when click logout button and navigate user to /", async () => {
    useAuthStore.setState({ user: mockTenantUser });

    renderComponent();

    const user = userEvent.setup();

    const logoutBtn = await screen.findByRole("button", { name: /logout/i });

    await user.click(logoutBtn);

    expect(
      screen.queryByRole("button", { name: /logout/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /login \/ register/i }),
    ).toBeInTheDocument();
  });
});
