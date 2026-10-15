import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../../../../src/pages/auth/register/RegisterPage";
import HomePage from "../../../../src/pages/HomePage";
import DisplayLocation from "./DisplayLocation";

describe("<RegisterPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient();
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/auth/register", state: { role: "landlord" } },
        ]}
      >
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <DisplayLocation />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    return {
      user,
      firstNameInput: screen.getByRole("textbox", { name: /First Name/i }),
      lastNameInput: screen.getByRole("textbox", { name: /Last Name/i }),
      phoneInput: screen.getByRole("textbox", { name: /phone/i }),
      emailInput: screen.getByRole("textbox", { name: /email/i }),
      passwordInput: screen.getByPlaceholderText(/Enter password/i),
      confirmPasswordInput: screen.getByPlaceholderText(/confirm password/i),
      submitButton: screen.getByRole("button", { name: /Sign up/i }),
    };
  };

  it("should correctly render the form", () => {
    const {
      firstNameInput,
      lastNameInput,
      passwordInput,
      confirmPasswordInput,
      phoneInput,
      submitButton,
      emailInput,
    } = renderComponent();

    // Check Text
    expect(
      screen.getByRole("heading", { name: /Sign up/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in here/i }),
    ).toBeInTheDocument();

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render required errors for all inputs", async () => {
    const { user, submitButton } = renderComponent();

    await user.click(submitButton);

    expect(screen.getByText("FirstName required")).toBeInTheDocument();
    expect(screen.getByText("LastName required")).toBeInTheDocument();
    expect(screen.getByText("Email required")).toBeInTheDocument();
    expect(screen.getByText("Phone required")).toBeInTheDocument();
    expect(screen.getByText("Password required")).toBeInTheDocument();
    expect(screen.getByText("ConfirmPassword required")).toBeInTheDocument();
  });

  it.each([
    {
      field: "firstName",
      value: "a".repeat(256),
      scenario: "too long",
      errorMessage: /FirstName too long/i,
    },
    {
      field: "lastName",
      value: "a".repeat(256),
      scenario: "too long",
      errorMessage: /LastName too long/i,
    },
    {
      field: "email",
      value: "a",
      scenario: "invalid",
      errorMessage: /Invalid email/i,
    },
    {
      field: "phone",
      value: "a".repeat(11),
      scenario: "too long",
      errorMessage: /phone number must be 10 digits/i,
    },
    {
      field: "password",
      value: "a".repeat(3),
      scenario: "too short",
      errorMessage: /Password too short/i,
    },
    {
      field: "password",
      value: "a".repeat(101),
      scenario: "too long",
      errorMessage: /Password require 100\+ characters/i,
    },
  ])(
    "should display error for $field if $field is $scenario",
    async ({ errorMessage, value, field }) => {
      const {
        user,
        firstNameInput,
        lastNameInput,
        emailInput,
        phoneInput,
        passwordInput,
        confirmPasswordInput,
        submitButton,
      } = renderComponent();

      // first  Populate inputs with valid defaults
      await user.type(firstNameInput, "Johnson");
      await user.type(lastNameInput, "Brown");
      await user.type(emailInput, "brown@gmail.com");
      await user.type(phoneInput, "0821234512");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password123");

      // Then override specific field you are testing with invalid input
      const fieldMap: Record<string, HTMLElement> = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        phone: phoneInput,
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
      };

      // Clear and paste the test value into the target field
      await user.clear(fieldMap[field]);
      await user.paste(value);

      await user.click(submitButton);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    },
  );

  it("should render error for already registered users", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = renderComponent();

    // first  Populate inputs with valid defaults
    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Brown");
    await user.type(emailInput, "existingemail@gmail.com");
    await user.type(phoneInput, "0821234512");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);
    screen.debug();

    expect(
      await screen.findByText(/User already registered./i),
    ).toBeInTheDocument();
  });

  it("should successfully register user and redirect him to home page", async () => {
    const {
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = renderComponent();

    // first  Populate inputs with valid defaults
    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Brown");
    await user.type(emailInput, "brown@gmail.com");
    await user.type(phoneInput, "0821234512");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    expect(screen.getByTestId("display-location")).toHaveTextContent("/");
    expect(
      screen.getByRole("heading", { name: /find your perfect home/i }),
    ).toBeInTheDocument();
  });
});
