import { QueryClient } from "@tanstack/react-query";
import { act, screen } from "@testing-library/react";
import type { Apartment } from "../src/entities/Apartment";
import type { Response } from "../src/entities/Response";
import useAuthStore from "../src/store";
import { mockAdminUser, mockApartment, mockLandlordUser } from "./mocks/data";
import { navigateTo } from "./utils";

describe("Routes", () => {
  it("should render home page for /", () => {
    navigateTo("/");

    expect(
      screen.getByRole("heading", { name: /find your perfect home/i }),
    ).toBeInTheDocument();
  });

  it("should render apartments page for /apartments", () => {
    navigateTo("/apartments");

    expect(
      screen.getByRole("heading", { name: /Apartments/i }),
    ).toBeInTheDocument();
  });

  it("should render apartments detail page for /apartments/:id ", async () => {
    navigateTo(`/apartments/${mockApartment._id}`);

    expect(
      await screen.findByRole("heading", { name: mockApartment.title }),
    ).toBeInTheDocument();
  });

  it("should should render 404 page for invalid routes", () => {
    navigateTo("/not-found");

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });

  describe("Protected Routes", () => {
    beforeEach(() => useAuthStore.setState({ user: null }));

    it.each([
      {
        url: "/account",
        scenario: "/account",
      },
      {
        url: "/apartments/listings",
        scenario: "/apartments/listings",
      },
      {
        url: "/apartments/listings/new",
        scenario: "/apartments/listings/new",
      },
      {
        url: `/apartments/listings/${mockLandlordUser}`,
        scenario: "/apartments/listings/:id",
      },
      {
        url: `/apartments/listings/${mockLandlordUser._id}/edit`,
        scenario: "/apartments/listings/:id/edit",
      },
      {
        url: "/admin",
        scenario: "/admin",
      },
      {
        url: `/admin/users/${mockAdminUser._id}/apartments`,
        scenario: "/admin/users/:id/apartments",
      },
      {
        url: `/admin/users/apartments/${mockApartment._id}`,
        scenario: "/admin/users/apartments/:id",
      },
    ])(
      "should redirect unauthenticated user to login when navigating to $scenario",
      ({ url }) => {
        navigateTo(url);

        expect(
          screen.getByRole("heading", {
            name: /Sign in/i,
          }),
        ).toBeInTheDocument();
      },
    );

    it.each([
      {
        url: "/account",
        value: `${mockLandlordUser.firstName} ${mockLandlordUser.lastName}`,
        scenario: "/account",
      },
      {
        url: "/apartments/listings",
        value: "Your Listings",
        scenario: "/apartments/listings",
      },
      {
        url: "/apartments/listings/new",
        value: "Create New Listing",
        scenario: "/apartments/listings/new",
      },
      {
        url: `/apartments/listings/${mockApartment._id}`,
        value: `${mockApartment.title}`,
        scenario: "/apartments/listings/:id",
      },
    ])(
      "should navigate to $scenario if user is authenticated",
      async ({ url, value }) => {
        useAuthStore.setState({ user: mockLandlordUser });

        navigateTo(url);

        expect(
          await screen.findByRole("heading", {
            name: value,
          }),
        ).toBeInTheDocument();
      },
    );

    it("should should navigate to /apartments/listings/:id/edit if user is authenticated", () => {
      useAuthStore.setState({ user: mockLandlordUser });

      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      queryClient.setQueryData<Response<Apartment>>(
        ["apartments", mockApartment._id],
        { success: true, results: mockApartment },
      );

      navigateTo(`/apartments/listings/${mockApartment._id}/edit`, queryClient);

      expect(
        screen.getByRole("heading", {
          name: `Edit Apartment: ${mockApartment.title}`,
        }),
      ).toBeInTheDocument();

      queryClient.clear();
    });
  });

  describe("Admin Routes", () => {
    beforeEach(() => useAuthStore.setState({ user: null }));

    it.each([
      {
        url: "/admin",
        scenario: "/admin",
      },
      {
        url: `/admin/users/${mockLandlordUser._id}/apartments`,
        scenario: "/admin/users/:landlordId/apartments",
      },
      {
        url: `/admin/users/apartments/${mockApartment._id}`,
        scenario: "/admin/users/apartments/:id",
      },
    ])(
      "should redirect unauthorize users from $scenario to previous route",
      async ({ url }) => {
        useAuthStore.setState({ user: mockLandlordUser });

        act(() => {
          const { router } = navigateTo("/");
          router.navigate(url);
        });

        expect(
          screen.getByRole("heading", { name: /find your perfect home/i }),
        ).toBeInTheDocument();
      },
    );

    it("should navigate to /admin if user is admin", () => {
      useAuthStore.setState({ user: mockAdminUser });

      navigateTo("/admin");

      expect(
        screen.getByRole("heading", { name: /all users/i }),
      ).toBeInTheDocument();
    });

    it("should navigate to /admin/users/:landlordId/apartments if user is admin", () => {
      useAuthStore.setState({ user: mockAdminUser });

      navigateTo(`/admin/users/${mockLandlordUser._id}/apartments`);

      expect(
        screen.getByRole("heading", { name: /Admin - Apartments/i }),
      ).toBeInTheDocument();
    });

    it("should navigate to /admin/users/apartments/:id if user is admin", async () => {
      useAuthStore.setState({ user: mockAdminUser });

      navigateTo(`/admin/users/apartments/${mockApartment._id}`);

      expect(
        await screen.findByRole("heading", { name: mockApartment.title }),
      ).toBeInTheDocument();
    });
  });
});
