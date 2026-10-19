import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResetPasswordPage from "../../../../src/pages/auth/reset-password/ResetPasswordPage";
import HomePage from "../../../../src/pages/HomePage";
import { DisplayLocation } from "../../../utils";

describe("<ResetPasswordPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <MemoryRouter
        initialEntries={["/auth/reset-password?token=1234&id=1234"]}
      >
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/auth/reset-password"
              element={<ResetPasswordPage />}
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <DisplayLocation />
          <Toaster />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    return {
      user,
      passwordInput: screen.getByLabelText("Password"),
      confirmPasswordInput: screen.getByLabelText("Confirm Password"),
      submitButton: screen.getByRole("button", { name: /Submit/i }),
    };
  };

  it("should render correctly", () => {
    const { submitButton, passwordInput, confirmPasswordInput } =
      renderComponent();

    expect(
      screen.getByRole("heading", { name: /Reset Password/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter your new password/i),
    ).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render errors when submitting an empty form", async () => {
    const { user, submitButton } = renderComponent();

    await user.click(submitButton);

    expect(screen.getByText("Password required")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password required")).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "too short",
      value: "a",
      errorMessage: /Password too short/i,
    },
    {
      scenario: "too long",
      value: "a".repeat(101),
      errorMessage: /Password require 100\+ characters/i,
    },
  ])(
    "should render error for password if $scenario",
    async ({ errorMessage, value }) => {
      const { user, submitButton, passwordInput, confirmPasswordInput } =
        renderComponent();

      await user.type(passwordInput, value);
      await user.type(confirmPasswordInput, "aaaaa");

      await user.click(submitButton);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    },
  );

  it.each([
    {
      scenario: "too short",
      value: "a",
      errorMessage: /Confirm Password too short/i,
    },
    {
      scenario: "too long",
      value: "a".repeat(101),
      errorMessage: /Confirm Password require 100\+ characters/i,
    },
  ])(
    "should render error for confirmPassword if $scenario",
    async ({ errorMessage, value }) => {
      const { user, submitButton, passwordInput, confirmPasswordInput } =
        renderComponent();

      await user.type(passwordInput, "aaaaa");
      await user.type(confirmPasswordInput, value);

      await user.click(submitButton);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    },
  );

  // it("should redirect the user to Home page after a successful form submission", async () => {
  //   const { user, submitButton, passwordInput, confirmPasswordInput } =
  //     renderComponent();

  //   await user.type(passwordInput, "aaaaa");
  //   await user.type(confirmPasswordInput, "aaaaa");

  //   await user.click(submitButton);

  //   // expect(screen.getByTestId("display-location")).toHaveTextContent("/");
  //   await screen.findByRole("heading", { name: /find your perfect home/i });
  // });
});
