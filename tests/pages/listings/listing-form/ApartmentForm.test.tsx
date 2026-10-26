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
    const form = {
      titleInput: screen.getByRole("textbox", { name: /title/i }),
      priceInput: screen.getByRole("textbox", { name: /price/i }),
      bedroomsInput: screen.getByRole("textbox", { name: /bedrooms/i }),
      addressInput: screen.getByRole("textbox", { name: /address/i }),
      bathroomsInput: screen.getByRole("textbox", { name: /bathrooms/i }),
      statusSelectInput: screen.getByRole("combobox", { name: /status/i }),
      typeSelectInput: screen.getByRole("combobox", { name: /type/i }),
      amenitiesInput: screen.getByRole("textbox", { name: /amenities/i }),
      cityInput: screen.getByRole("textbox", { name: /city/i }),
      uploadInput: screen.getByLabelText(/click to upload/i),
      descriptionInput: screen.getByRole("textbox", {
        name: /description/i,
      }),
      submitButton: screen.getByRole("button", {
        name: /Submit New Apartment/i,
      }),
    };

    const fillFormWithValidData = async () => {
      await user.type(form.titleInput, "aaa");
      await user.type(form.descriptionInput, "aaa");
      await user.type(form.priceInput, "3600");
      await user.type(form.cityInput, "aaa");
      await user.type(form.bathroomsInput, "1");
      await user.type(form.bedroomsInput, "2");
      await user.type(form.addressInput, "aaa");
      await user.selectOptions(form.statusSelectInput, "available");
      await user.selectOptions(form.typeSelectInput, "2-bedrooms");
    };

    return {
      user,
      form,
      fillFormWithValidData,
    };
  };

  describe("Rendering", () => {
    it("should render correctly", () => {
      const { form } = renderComponent();

      // Defaults values
      expect(form.titleInput).toHaveValue("");
      expect(form.priceInput).toHaveValue("");
      expect(form.bedroomsInput).toHaveValue("");
      expect(form.cityInput).toHaveValue("");
      expect(form.addressInput).toHaveValue("");
      expect(form.bathroomsInput).toHaveValue("");
      expect(form.amenitiesInput).toHaveValue("");
      expect(form.descriptionInput).toHaveValue("");
      expect(form.typeSelectInput).toHaveValue("");
      expect(form.statusSelectInput).toHaveValue("");

      expect(form.titleInput).toBeInTheDocument();
      expect(form.priceInput).toBeInTheDocument();
      expect(form.bedroomsInput).toBeInTheDocument();
      expect(form.cityInput).toBeInTheDocument();
      expect(form.addressInput).toBeInTheDocument();
      expect(form.bathroomsInput).toBeInTheDocument();
      expect(form.amenitiesInput).toBeInTheDocument();
      expect(form.descriptionInput).toBeInTheDocument();
      expect(form.typeSelectInput).toBeInTheDocument();
      expect(form.statusSelectInput).toBeInTheDocument();
      expect(form.uploadInput).toBeInTheDocument();
      expect(form.submitButton).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("should show validation errors when submitted empty", async () => {
      const { user, form } = renderComponent();

      await user.click(form.submitButton);

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
        const { user, form, fillFormWithValidData } = renderComponent();

        const fields: Record<string, HTMLElement> = {
          title: form.titleInput,
          description: form.descriptionInput,
          price: form.priceInput,
          bedrooms: form.bedroomsInput,
          bathrooms: form.bathroomsInput,
          city: form.cityInput,
          address: form.addressInput,
          status: form.statusSelectInput,
          type: form.typeSelectInput,
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

        await user.click(form.submitButton);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      },
    );
  });

  describe("Image Upload", () => {
    it("should show error if fewer than 3 images are uploaded", async () => {
      const { user, form } = renderComponent();

      // Create Image File to be Uploaded
      const imageFile = new File(["image content"], "image1.png", {
        type: "image/png",
      });

      // Upload the image
      await user.upload(form.uploadInput, imageFile);

      expect(toast.error).toHaveBeenCalledWith(
        "Please select exactly 3 images. You selected 1",
      );
    });

    it("should show error if more than 3 images are uploaded", async () => {
      const { user, form } = renderComponent();

      // Create image files
      const imageFiles = Array.from({ length: 4 }, (_, index) => {
        return new File([`image ${index}`], `image${index}.png`, {
          type: "image/png",
        });
      });

      await user.upload(form.uploadInput, imageFiles);

      expect(toast.error).toHaveBeenCalledWith(
        "Please select exactly 3 images. You selected 4",
      );
    });

    it("should show error when uploading non-image files", async () => {
      const { user, form } = renderComponent();

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

      await user.upload(form.uploadInput, imageFiles);

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("is not an image"),
      );
    });

    it("should show error when uploading an image larger than 10 MB", async () => {
      const { user, form } = renderComponent();

      const imageFiles = [
        new File(["image"], "one.png", { type: "image/png" }),
        new File(["image"], "two.png", { type: "image/png" }),
        new File([new Uint8Array(10 * 1024 * 1024 + 1)], "large.png", {
          type: "image/png",
        }),
      ];

      await user.upload(form.uploadInput, imageFiles);

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("too large"),
      );

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("3 valid images"),
      );
    });

    it("should accept 3 images and render the preview images", async () => {
      const { user, form } = renderComponent();

      // Create image files
      const imageFiles = Array.from({ length: 3 }, (_, index) => {
        return new File([`image ${index}`], `image${index}.png`, {
          type: "image/png",
        });
      });

      await user.upload(form.uploadInput, imageFiles);

      expect(await screen.findByAltText("preview-0")).toBeInTheDocument();
      expect(screen.getByAltText("preview-1")).toBeInTheDocument();
      expect(screen.getByAltText("preview-2")).toBeInTheDocument();
      expect(screen.getAllByRole("img")).toHaveLength(3);
    });
  });

  // describe("Form Submission", async () => {
  //   it("should submit the form successfully and navigate user to /apartments/listings", async () => {
  //     useAuthStore.setState({ user: mockLandlordUser });

  //     const { user, fillFormWithValidData, form } = renderComponent();

  //     // Fill the form inputs
  //     await fillFormWithValidData();

  //     // Add Image File
  //     const imageFiles = Array.from({ length: 3 }, (_, index) => {
  //       return new File([`image-${index}`], `image${index}.png`, {
  //         type: "image/png",
  //       });
  //     });

  //     await user.upload(form.uploadInput, imageFiles);

  //     // Add Coordinates
  //     const coordinateBtn = screen.getByRole("button", {
  //       name: /Select test location/i,
  //     });

  //     await user.click(coordinateBtn);

  //     await user.click(form.submitButton);

  //     // expect(form.submitButton).toBeDisabled();

  //     screen.debug();
  //     await waitForElementToBeRemoved(
  //       async () => await screen.findByText(/Please wait.../i),
  //     );

  //     expect(screen.getByTestId("display-location")).toHaveTextContent(
  //       "/apartments/listings",
  //     );
  //   });
  // });
});
