import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/listings/ListingPage";
import AddListingPage from "./pages/listings/new/AddListingPage";
import ListingDetailPage from "./pages/listings/details/ListingDetailPage";
import ListingEditPage from "./pages/listings/edit/ListingEditPage";
import ApartmentsPage from "./pages/apartments/ApartmentsPage";

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
        path: "apartments",
        element: <ApartmentsPage />,
      },
      {
        path: "apartments/:id",
        element: <ListingDetailPage />,
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
      {
        path: "listings/:id/edit",
        element: <ListingEditPage />,
      },
    ],
  },
]);

export default router;
