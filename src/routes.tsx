import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./components/middlewares/AdminRoute";
import ProtectRoute from "./components/middlewares/ProtectRoute";
import RedirectIfAuthenticated from "./components/middlewares/RedirectIfAuthenticated";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/account/AccountPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminApartmentPage from "./pages/admin/apartments-page/AdminApartmentPage";
import AdminApartmentDetailsPage from "./pages/admin/details-page/AdminApartmentDetailsPage";
import ApartmentsPage from "./pages/apartments/ApartmentsPage";
import AuthPage from "./pages/auth/AuthPage";
import ForgotPasswordPage from "./pages/auth/forgot-password/ForgotPasswordPage";
import LoginPage from "./pages/auth/login/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import ResetPasswordPage from "./pages/auth/reset-password/ResetPasswordPage";
import ListingPage from "./pages/listings/ListingPage";
import ListingDetailPage from "./pages/listings/details-page/ListingDetailPage";
import ListingEditPage from "./pages/listings/edit-page/ListingEditPage";
import AddListingPage from "./pages/listings/new-page/AddListingPage";

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
                element: <AdminApartmentPage />,
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
          {
            path: "/auth/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/auth/reset-password",
            element: <ResetPasswordPage />,
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
