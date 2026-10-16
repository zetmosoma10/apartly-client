import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../src/routes";

describe("Routes", () => {
  it("should render home page for /", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /find your perfect home/i }),
    ).toBeInTheDocument();
  });

  it("should render apartments page for /apartments", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/apartments"],
    });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /Apartments/i }),
    ).toBeInTheDocument();
  });
});
