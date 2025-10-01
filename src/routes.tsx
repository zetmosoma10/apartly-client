import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/listings/ListingPage";
import AddListingPage from "./pages/new/AddListingPage";

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
    ],
  },
]);

export default router;
