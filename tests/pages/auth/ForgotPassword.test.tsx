import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import { MemoryRouter } from "react-router-dom";
import ForgotPasswordPage from "../../../src/pages/auth/forgot-password/ForgotPasswordPage";

describe("<ForgotPasswordPage/>", () => {
  const renderComponent = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ForgotPasswordPage />
          <Toaster />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    return {
      user,
      emailInput: screen.getByRole("textbox", { name: /email/i }),
      submitButton: screen.getByRole("button", { name: /Submit/i }),
    };
  };

  it("should render correctly", () => {
    const { submitButton, emailInput } = renderComponent();

    expect(
      screen.getByRole("heading", { name: /Forgot Password\?/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign in here/i })).toHaveAttribute(
      "href",
      "/auth/login",
    );
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render error required when user submit an empty form", async () => {
    const { user, submitButton } = renderComponent();

    await user.click(submitButton);

    expect(screen.getByText(/email required/i)).toBeInTheDocument();
  });

  it("should render error if email is not found in database", async () => {
    const { user, emailInput, submitButton } = renderComponent();

    await user.type(emailInput, "notfound@gmail.com");

    await user.click(submitButton);

    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });

  it("should toast success message when form submitted", async () => {
    const { user, emailInput, submitButton } = renderComponent();

    await user.type(emailInput, "john@gmail.com");

    await user.click(submitButton);

    expect(
      await screen.findByText(
        /We have sent you an email with instructions to reset your password/i,
      ),
    ).toBeInTheDocument();
  });
});
