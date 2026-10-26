import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListingDetailPage from "../../../src/pages/listings/details-page/ListingDetailPage";
import useAuthStore from "../../../src/store";
import { mockLandlordUser, mockTenantUser } from "../../mocks/data";

describe("<ListingDetailPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ListingDetailPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => useAuthStore.setState({ user: mockLandlordUser }));

  it("should render loading indicator", () => {
    renderComponent();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should remove  loading indicator after fetching data", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
  });

  it("should render the apartment when user is landlord", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

    expect(
      screen.getByRole("heading", { name: /Modern Loft Apartment/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Edit Apartment/i }),
    ).toHaveAttribute("href", "/apartments/listings/apt-123/edit");

    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  it("should render the apartment when user is tenant", async () => {
    useAuthStore.setState({ user: mockTenantUser });

    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

    expect(
      screen.getByRole("heading", { name: /Modern Loft Apartment/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: /Edit Apartment/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /Delete/i }),
    ).not.toBeInTheDocument();
  });
});
