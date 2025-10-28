import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/listings/ListingPage";
import AddListingPage from "./pages/listings/new/AddListingPage";
import ListingDetailPage from "./pages/listings/details/ListingDetailPage";
import ListingEditPage from "./pages/listings/edit/ListingEditPage";
import ApartmentsPage from "./pages/apartments/ApartmentsPage";
import AuthPage from "./pages/auth/AuthPage";
import LoginPage from "./pages/auth/login/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import ProtectRoute from "./components/middlewares/ProtectRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/account/AccountPage";
import RedirectIfAuthenticated from "./components/middlewares/RedirectIfAuthenticated";
import AdminRoute from "./components/middlewares/AdminRoute";
import AdminPage from "./pages/admin/AdminPage";

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
