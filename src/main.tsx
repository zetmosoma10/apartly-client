import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-image-gallery/styles/css/image-gallery.css";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
