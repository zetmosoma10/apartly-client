import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/listings/ListingPage";
import AddListingPage from "./pages/listings/new/AddListingPage";
import ListingDetailPage from "./pages/listings/details/ListingDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "listings",
        element: <ListingPage />,
      },
      {
        path: "listings/new",
        element: <AddListingPage />,
      },
      {
        path: "listings/:id",
        element: <ListingDetailPage />,
      },
    ],
  },
]);

export default router;
