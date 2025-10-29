import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/listings/ListingPage";
import ApartmentsPage from "./pages/apartments/ApartmentsPage";
import AuthPage from "./pages/auth/AuthPage";
import LoginPage from "./pages/auth/login/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import ProtectRoute from "./components/middlewares/ProtectRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/account/AccountPage";
import ListingDetailPage from "./pages/listings/details-page/ListingDetailPage";
import ListingEditPage from "./pages/listings/edit-page/ListingEditPage";
import AddListingPage from "./pages/listings/new-page/AddListingPage";
import AdminRoute from "./components/middlewares/AdminRoute";
import AdminPage from "./pages/admin/AdminPage";
import AdminApartmensPage from "./pages/admin/apartments-page/AdminApartmensPage";
import RedirectIfAuthenticated from "./components/middlewares/RedirectIfAuthenticated";
import AdminApartmentDetailsPage from "./pages/admin/details-page/AdminApartmentDetailsPage";

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
        path: "/apartments",
        element: <ApartmentsPage />,
      },
      {
        path: "/apartments/:id",
        element: <ListingDetailPage />,
      },
      {
        element: <ProtectRoute />,
        children: [
          {
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "/apartments/listings",
            element: <ListingPage />,
          },
          {
            path: "/apartments/listings/new",
            element: <AddListingPage />,
          },
          {
            path: "/apartments/listings/:id",
            element: <ListingDetailPage />,
          },
          {
            path: "/apartments/listings/:id/edit",
            element: <ListingEditPage />,
          },
          {
            element: <AdminRoute />,
            children: [
              {
                path: "/admin",
                element: <AdminPage />,
              },
              {
                path: "/admin/users/:landlordId/apartments",
                element: <AdminApartmensPage />,
              },
              {
                path: "/admin/users/apartments/:id",
                element: <AdminApartmentDetailsPage />,
              },
            ],
          },
        ],
      },
      {
        element: <RedirectIfAuthenticated />,
        children: [
          {
            path: "/auth",
            element: <AuthPage />,
          },
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
          {
            path: "/auth/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
