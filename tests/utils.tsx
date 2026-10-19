/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { routes } from "../src/routes";

// A small helper component to read the current URL path in tests
export const DisplayLocation = () => {
  const { pathname } = useLocation();
  return <div data-testid="display-location">{pathname}</div>;
};

export const navigateTo = (
  path: string,
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  }),
) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  return { queryClient, router };
};
