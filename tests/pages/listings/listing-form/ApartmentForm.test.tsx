import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../../../src/pages/auth/login/LoginPage";
import ApartmentForm from "../../../../src/pages/listings/listing-form/ApartmentForm";
import ListingPage from "../../../../src/pages/listings/ListingPage";
import useAuthStore from "../../../../src/store";
import { mockApartment } from "../../../mocks/data";
import { DisplayLocation } from "../../../utils";

// MOCKS
vi.mock("../../../../src/pages/listings/listing-form/MapPicker", async () => ({
  default: ({
    setCoordinates,
    coordinates,
  }: {
    coordinates?: { lat: number; lng: number } | null;
    setCoordinates: React.Dispatch<
      React.SetStateAction<{
        lat: number | null;
        lng: number | null;
      }>
    >;
  }) => (
    <div>
      <p>
        {coordinates?.lat} {coordinates?.lng}
      </p>
      <button
        type="button"
        onClick={() => setCoordinates({ lat: -26.2041, lng: 28.0473 })}
      >
        Select test location
      </button>
    </div>
  ),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("<ApartmentForm/>", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null });
  });

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
            <Route path="/apartments/listings" element={<ListingPage />} />
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
    const uploadInput = screen.getByLabelText(/click to upload/i);
    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    const submitButton = screen.getByRole("button", {
      name: /Submit New Apartment/i,
    });

    const fillFormWithValidData = async () => {
      await user.type(titleInput, "aaa");
      await user.type(descriptionInput, "aaa");
      await user.type(priceInput, "3600");
      await user.type(cityInput, "aaa");
      await user.type(bathroomsInput, "1");
      await user.type(bedroomsInput, "2");
      await user.type(addressInput, "aaa");
      await user.selectOptions(statusSelectInput, "available");
      await user.selectOptions(typeSelectInput, "2-bedrooms");
    };

    return {
      user,
      titleInput,
      cityInput,
      priceInput,
      submitButton,
      bedroomsInput,
      bathroomsInput,
      addressInput,
      amenitiesInput,
      descriptionInput,
      statusSelectInput,
      typeSelectInput,
      uploadInput,
      fillFormWithValidData,
    };
  };

  describe("Rendering", () => {
    it("should render correctly", () => {
      const {
        titleInput,
        cityInput,
        bedroomsInput,
        addressInput,
        priceInput,
        submitButton,
        bathroomsInput,
        amenitiesInput,
        descriptionInput,
        statusSelectInput,
        typeSelectInput,
        uploadInput,
      } = renderComponent();

      // Defaults values
      expect(titleInput).toHaveValue("");
      expect(priceInput).toHaveValue("");
      expect(bedroomsInput).toHaveValue("");
      expect(cityInput).toHaveValue("");
      expect(addressInput).toHaveValue("");
      expect(bathroomsInput).toHaveValue("");
      expect(amenitiesInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
      expect(typeSelectInput).toHaveValue("");
      expect(statusSelectInput).toHaveValue("");

      expect(titleInput).toBeInTheDocument();
      expect(priceInput).toBeInTheDocument();
      expect(bedroomsInput).toBeInTheDocument();
      expect(cityInput).toBeInTheDocument();
      expect(addressInput).toBeInTheDocument();
      expect(bathroomsInput).toBeInTheDocument();
      expect(amenitiesInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(typeSelectInput).toBeInTheDocument();
      expect(statusSelectInput).toBeInTheDocument();
      expect(uploadInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("should show validation errors when submitted empty", async () => {
      const { user, submitButton } = renderComponent();

      await user.click(submitButton);

      expect(await screen.findByText(/title required/i)).toBeInTheDocument();
      expect(await screen.findByText(/city required/i)).toBeInTheDocument();
      expect(await screen.findByText(/bedrooms required/i)).toBeInTheDocument();
      expect(await screen.findByText(/type required/i)).toBeInTheDocument();
      expect(await screen.findByText(/status required/i)).toBeInTheDocument();
      expect(await screen.findByText(/address required/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/bathrooms required/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/price must be a positive/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/description required/i),
      ).toBeInTheDocument();
    });

    it.each([
      {
        field: "title",
        scenario: "too long",
        value: "a".repeat(256),
        errorMessage: /title too long/i,
      },
      {
        field: "description",
        scenario: "too long",
        value: "a".repeat(1024),
        errorMessage: /description too long/i,
      },
      {
        field: "address",
        scenario: "too long",
        value: "a".repeat(255),
        errorMessage: /address too long/i,
      },
      {
        field: "city",
        scenario: "too long",
        value: "a".repeat(255),
        errorMessage: /city to long/i,
      },
      {
        field: "price",
        scenario: "invalid price type",
        value: "a",
        errorMessage: /price must be a number/i,
      },
      {
        field: "bedrooms",
        scenario: "not a number",
        value: "aa",
        errorMessage: /bedrooms must be a number/i,
      },
      {
        field: "bathrooms",
        scenario: "not a number",
        value: "aa",
        errorMessage: /bathrooms must be a number/i,
      },
    ])(
      "should show error for $field if it's $scenario",
      async ({ field, value, errorMessage }) => {
        const {
          user,
          titleInput,
          cityInput,
          bedroomsInput,
          addressInput,
          priceInput,
          bathroomsInput,
          descriptionInput,
          statusSelectInput,
          typeSelectInput,
          submitButton,
          fillFormWithValidData,
        } = renderComponent();

        const fields: Record<string, HTMLElement> = {
          title: titleInput,
          description: descriptionInput,
          price: priceInput,
          bedrooms: bedroomsInput,
          bathrooms: bathroomsInput,
          city: cityInput,
          address: addressInput,
          status: statusSelectInput,
          type: typeSelectInput,
        };

        // Populate form with valid data
        await fillFormWithValidData();

        //   Updated current tested field
        if (
          field === "title" ||
          field === "address" ||
          field === "description" ||
          field === "city"
        ) {
          await user.click(fields[field]);
          await user.paste(value);
        } else {
          await user.type(fields[field], value);
        }

        await user.click(submitButton);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      },
    );
  });

  describe("Image Upload", () => {
    it("should show error if fewer than 3 images are uploaded", async () => {
      const { user, uploadInput } = renderComponent();

      // Create Image File to be Uploaded
      const imageFile = new File(["image content"], "image1.png", {
        type: "image/png",
      });

      // Upload the image
      await user.upload(uploadInput, imageFile);

      expect(toast.error).toHaveBeenCalledWith(
        "Please select exactly 3 images. You selected 1",
      );
    });

    it("should show error if more than 3 images are uploaded", async () => {
      const { user, uploadInput } = renderComponent();

      // Create image files
      const imageFiles = Array.from({ length: 4 }, (_, index) => {
        return new File([`image ${index}`], `image${index}.png`, {
          type: "image/png",
        });
      });

      await user.upload(uploadInput, imageFiles);

      expect(toast.error).toHaveBeenCalledWith(
        "Please select exactly 3 images. You selected 4",
      );
    });

    it("should show error when uploading non-image files", async () => {
      const { user, uploadInput } = renderComponent();

      // Create image files
      const imageFiles = [
        new File(["image 1"], `image1.png`, {
          type: "image/png",
        }),
        new File(["image 2"], `image2.png`, {
          type: "image/png",
        }),
        new File(["image 2"], `image2.png`, {
          type: "application/pdf",
        }),
      ];

      await user.upload(uploadInput, imageFiles);

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("is not an image"),
      );
    });

    it("should show error when uploading an image larger than 10 MB", async () => {
      const { user, uploadInput } = renderComponent();

      const imageFiles = [
        new File(["image"], "one.png", { type: "image/png" }),
        new File(["image"], "two.png", { type: "image/png" }),
        new File([new Uint8Array(10 * 1024 * 1024 + 1)], "large.png", {
          type: "image/png",
        }),
      ];

      await user.upload(uploadInput, imageFiles);

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("too large"),
      );

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("3 valid images"),
      );
    });

    it("should accept 3 images and render the preview images", async () => {
      const { user, uploadInput } = renderComponent();

      // Create image files
      const imageFiles = Array.from({ length: 3 }, (_, index) => {
        return new File([`image ${index}`], `image${index}.png`, {
          type: "image/png",
        });
      });

      await user.upload(uploadInput, imageFiles);

      expect(await screen.findByAltText("preview-0")).toBeInTheDocument();
      expect(screen.getByAltText("preview-1")).toBeInTheDocument();
      expect(screen.getByAltText("preview-2")).toBeInTheDocument();
      expect(screen.getAllByRole("img")).toHaveLength(3);
    });
  });
});
