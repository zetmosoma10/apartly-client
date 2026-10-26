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
import { mockAllApartments } from "../../mocks/data";
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

    expect(
      await screen.findByRole("heading", { name: "Modern Loft Apartment" }),
    ).toBeInTheDocument();
  });

  it("should render pagination if totalPage > 1", async () => {
    server.use(
      http.get(`${baseUrl}/apartments`, () =>
        HttpResponse.json({
          success: true,
          count: 3,
          totalDocuments: 3,
          results: mockAllApartments,
          pagination: {
            currentPage: 1,
            totalPages: 2,
            currentCountPerPage: 2,
            totalPerPage: 3,
            totalDocuments: 3,
            hasNextPage: true,
          },
        }),
      ),
    );

    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

    expect(
      await screen.findByRole("button", { name: "previous-page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "previous-page" }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: "next-page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "next-page" }),
    ).not.toBeDisabled();

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  });

  it("should not render pagination if totalPage < 1", async () => {
    server.use(
      http.get(`${baseUrl}/apartments`, () =>
        HttpResponse.json({
          success: true,
          count: 0,
          totalDocuments: 1,
          results: mockAllApartments,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            currentCountPerPage: 1,
            totalPerPage: 1,
            totalDocuments: 1,
            hasNextPage: false,
          },
        }),
      ),
    );

    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

    expect(
      screen.queryByRole("button", { name: "previous-page" }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "next-page" }),
    ).not.toBeInTheDocument();
  });

  // it("should render next page when clicking Next button", async () => {
  //   server.use(
  //     http.get(`${baseUrl}/apartments`, ({ request }) => {
  //       const url = new URL(request.url);
  //       const page = Number(url.searchParams.get("page") ?? 1);

  //       if (page === 2) {
  //         return HttpResponse.json({
  //           success: true,
  //           count: 1,
  //           totalDocuments: 2,
  //           results: [mockAllApartments[1]],
  //           pagination: {
  //             currentPage: 2,
  //             totalPages: 2,
  //             currentCountPerPage: 1,
  //             totalPerPage: 1,
  //             totalDocuments: 2,
  //             hasNextPage: false,
  //           },
  //         });
  //       }

  //       return HttpResponse.json({
  //         success: true,
  //         count: 1,
  //         totalDocuments: 2,
  //         results: [mockAllApartments[0]],
  //         pagination: {
  //           currentPage: 1,
  //           totalPages: 2,
  //           currentCountPerPage: 1,
  //           totalPerPage: 1,
  //           totalDocuments: 2,
  //           hasNextPage: true,
  //         },
  //       });
  //     }),
  //   );

  //   const { user } = renderComponent();

  //   await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  //   const nextButton = screen.getByRole("button", {
  //     name: "next-page",
  //   });
  //   const previousButton = screen.getByRole("button", {
  //     name: "previous-page",
  //   });
  //   const location = screen.getByTestId("display-location");

  //   expect(location).toHaveTextContent("/apartments");
  //   expect(previousButton).toBeDisabled();

  //   await user.click(nextButton);

  //   expect(location).toHaveTextContent("?page=2");

  //   // Verify that page-two content has rendered.
  //   expect(
  //     await screen.findByText(mockAllApartments[1].title),
  //   ).toBeInTheDocument();

  //   screen.debug(undefined, Infinity);
  //   // expect(nextButton).toBeDisabled();
  //   // expect(previousButton).toBeEnabled();

  //   await user.click(previousButton);

  //   expect(location).toHaveTextContent("/apartments");

  //   expect(
  //     await screen.findByText(mockAllApartments[0].title),
  //   ).toBeInTheDocument();
  // });
});
