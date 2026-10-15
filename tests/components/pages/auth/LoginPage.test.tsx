import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../../../src/pages/auth/login/LoginPage";
import HomePage from "../../../../src/pages/HomePage";
import DisplayLocation from "./DisplayLocation";

describe("<LoginPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient();
    render(
      <MemoryRouter initialEntries={["/auth/login"]}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <DisplayLocation />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    return {
      user,
      emailInput: screen.getByRole("textbox", { name: /email/i }),
      passwordInput: screen.getByPlaceholderText(/Enter password/i),
      submitButton: screen.getByRole("button", { name: /Sign in/i }),
    };
  };

  it("should render login form correctly", () => {
    const { emailInput, passwordInput, submitButton } = renderComponent();
    // Check Text
    expect(
      screen.getByRole("heading", { name: "Sign in" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign up here/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Check form elements
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Forgot password\?/i }),
    ).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "missing",
      errorMessage: /required/i,
    },
    {
      scenario: "invalid",
      email: "s",
      errorMessage: /invalid/i,
    },
  ])(
    "should display error message if email is $scenario",
    async ({ email, errorMessage }) => {
      const { user, emailInput, passwordInput, submitButton } =
        renderComponent();

      if (email !== undefined) await user.type(emailInput, email);
      await user.type(passwordInput, "123456");
      await user.click(submitButton);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    },
  );

  it.each([
    {
      scenario: "missing",
      errorMessage: /required/i,
    },
    {
      scenario: "too short",
      password: "12",
      errorMessage: /too short/i,
    },
    {
      scenario: "too long",
      password: "a".repeat(101),
      errorMessage: /Password require 100\+ characters/i,
    },
  ])(
    "should display error message if password is $scenario",
    async ({ password, errorMessage }) => {
      const { user, emailInput, passwordInput, submitButton } =
        renderComponent();

      if (password !== undefined) await user.type(passwordInput, password);
      await user.type(emailInput, "zet@gmail.com");
      await user.click(submitButton);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    },
  );

  it("should display error message if email and password not found", async () => {
    const { user, emailInput, passwordInput, submitButton } = renderComponent();

    await user.type(emailInput, "wrong@gmail.com");
    await user.type(passwordInput, "wrongPassword");
    await user.click(submitButton);

    expect(
      await screen.findByText(/Invalid email or password/i),
    ).toBeInTheDocument();
  });

  it("should correctly submit the form and redirect the user to Home page", async () => {
    const { user, emailInput, passwordInput, submitButton } = renderComponent();

    await user.type(emailInput, "zet@gmail.com");
    await user.type(passwordInput, "12345");
    await user.click(submitButton);

    expect(screen.getByTestId("display-location")).toHaveTextContent("/");
    expect(
      screen.getByRole("heading", { name: /find your perfect home/i }),
    ).toBeInTheDocument();
  });

  //   it("should disables the submit button and shows loading state during submission", async () => {
  //     const { user, emailInput, passwordInput, submitButton } = renderComponent();

  //     await user.type(emailInput, "zet@gmail.com");
  //     await user.type(passwordInput, "12345");
  //     await user.click(submitButton);
  //     screen.debug();

  //     expect(submitButton).toBeDisabled();
  //   });
});
