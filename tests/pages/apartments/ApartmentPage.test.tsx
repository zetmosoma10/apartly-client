import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ApartmentsPage from "../../../src/pages/apartments/ApartmentsPage";
import ListingDetailPage from "../../../src/pages/listings/details-page/ListingDetailPage";
import { server } from "../../server";
import { DisplayLocation } from "../../utils";

const baseUrl = import.meta.env.VITE_BASE_URL;

describe("<ApartmentsPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/apartments"]}>
          <Routes>
            <Route path="/apartments" element={<ApartmentsPage />} />
            <Route path="/apartments/:id" element={<ListingDetailPage />} />
          </Routes>
          <DisplayLocation />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const user = userEvent.setup();

    return {
      user,
      searchInput: screen.getByPlaceholderText(/Search apartments.../i),
      typeFilter: screen.getByTestId("type"),
      statusFilter: screen.getByTestId("status"),
      minPriceFilter: screen.getByTestId("minPrice"),
      maxPriceFilter: screen.getByTestId("maxPrice"),
    };
  };

  it("should render header and filters correctly", () => {
    const {
      searchInput,
      typeFilter,
      statusFilter,
      minPriceFilter,
      maxPriceFilter,
    } = renderComponent();

    expect(searchInput).toHaveValue("");
    expect(typeFilter).toHaveValue("");
    expect(statusFilter).toHaveValue("");
    expect(minPriceFilter).toHaveValue("");
    expect(maxPriceFilter).toHaveValue("");

    expect(
      screen.getByRole("heading", { name: /Apartments/i }),
    ).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(typeFilter).toBeInTheDocument();
    expect(statusFilter).toBeInTheDocument();
    expect(minPriceFilter).toBeInTheDocument();
    expect(maxPriceFilter).toBeInTheDocument();
  });

  it("should render loading indicator while fetching apartments", () => {
    renderComponent();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should remove loading indicator after fetching apartments", async () => {
    server.use(http.get("/apartments", () => HttpResponse.json([])));

    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
  });

  it("should render no apartments message if no apartments available", async () => {
    server.use(
      http.get(`${baseUrl}/apartments`, () =>
        HttpResponse.json({
          success: true,
          count: 0,
          totalDocuments: 0,
          results: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            currentCountPerPage: 1,
            totalPerPage: 3,
            totalDocuments: 0,
            hasNextPage: false,
          },
        }),
      ),
    );

    renderComponent();

    expect(await screen.findByText(/no apartments/i)).toBeInTheDocument();
  });

  it("should render the list of fetched apartments", async () => {
    renderComponent();

    const elements = await screen.findAllByRole("link");

    expect(elements).toHaveLength(2);
    expect(elements[0]).toHaveAttribute("href", "/apartments/apt-123");
    expect(elements[1]).toHaveAttribute("href", "/apartments/apt-456");
  });

  it("should navigate to /apartments/:id when clicking the lick", async () => {
    const { user } = renderComponent();

    const links = await screen.findAllByRole("link");

    await user.click(links[0]);
    screen.debug();

    expect(
      await screen.findByRole("heading", { name: "Modern Loft Apartment" }),
    ).toBeInTheDocument();
  });
});
