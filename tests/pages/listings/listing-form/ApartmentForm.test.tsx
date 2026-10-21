import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../../../src/pages/auth/login/LoginPage";
import ApartmentForm from "../../../../src/pages/listings/listing-form/ApartmentForm";
import { mockApartment } from "../../../mocks/data";
import { DisplayLocation } from "../../../utils";

vi.mock("./MapPicker", async () => {
  const React = await import("react");

  return {
    default: ({
      setCoordinates,
    }: {
      setCoordinates: React.Dispatch<
        React.SetStateAction<{
          lat: number | null;
          lng: number | null;
        }>
      >;
    }) => (
      <button
        type="button"
        onClick={() => setCoordinates({ lat: -26.2041, lng: 28.0473 })}
      >
        Select test location
      </button>
    ),
  };
});

describe("<ApartmentForm/>", () => {
  const renderComponent = (initialEntry = "/apartments/listings/new") => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route
              path="/apartments/listings/new"
              element={<ApartmentForm />}
            />
            <Route
              path="/apartments/listings/:id/edit"
              element={<ApartmentForm apartment={mockApartment} />}
            />
            <Route
              path="/auth/login"
              element={
                <>
                  <LoginPage />
                  <DisplayLocation />
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const user = userEvent.setup();
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    const priceInput = screen.getByRole("textbox", { name: /price/i });
    const bedroomsInput = screen.getByRole("textbox", { name: /bedrooms/i });
    const addressInput = screen.getByRole("textbox", { name: /address/i });
    const bathroomsInput = screen.getByRole("textbox", { name: /bathrooms/i });
    const statusSelectInput = screen.getByRole("combobox", { name: /status/i });
    const typeSelectInput = screen.getByRole("combobox", { name: /type/i });
    const amenitiesInput = screen.getByRole("textbox", { name: /amenities/i });
    const cityInput = screen.getByRole("textbox", { name: /city/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    const buttonInput = screen.getByRole("button", {
      name: /Submit New Apartment/i,
    });

    return {
      user,
      titleInput,
      cityInput,
      priceInput,
      buttonInput,
      bedroomsInput,
      bathroomsInput,
      addressInput,
      amenitiesInput,
      descriptionInput,
      statusSelectInput,
      typeSelectInput,
    };
  };

  it("should render correctly", () => {
    const {
      titleInput,
      cityInput,
      bedroomsInput,
      addressInput,
      priceInput,
      buttonInput,
      bathroomsInput,
      amenitiesInput,
      descriptionInput,
      statusSelectInput,
      typeSelectInput,
    } = renderComponent();

    expect(titleInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(bedroomsInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(bathroomsInput).toBeInTheDocument();
    expect(amenitiesInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
    expect(typeSelectInput).toBeInTheDocument();
    expect(statusSelectInput).toBeInTheDocument();
    expect(screen.getByLabelText(/click to upload/i)).toBeInTheDocument();
  });
});
