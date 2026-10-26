import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ListingPage from "../../../src/pages/listings/ListingPage";
import useAuthStore from "../../../src/store";
import { mockLandlordUser } from "../../mocks/data";

describe("<ListingPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/apartments/listings"]}>
          <Routes>
            <Route path="/apartments/listings" element={<ListingPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    useAuthStore.setState({ user: mockLandlordUser });
  });

  it("should render fetched apartments", async () => {
    renderComponent();

    expect(
      screen.getByRole("link", { name: /add new listing/i }),
    ).toHaveAttribute("href", "/apartments/listings/new");

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

    const rows = await screen.findAllByRole("row");

    expect(rows).toHaveLength(2);
  });

  it("should render loading indicator", () => {
    renderComponent();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should remove  loading indicator after fetching apartments", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
  });

  it("should message if no apartment available", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
  });
});
