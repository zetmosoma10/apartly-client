import { render, screen } from "@testing-library/react";
import Input from "../../src/components/Input";

describe("<Input/>", () => {
  const register = (inputName: string) => {
    return {
      name: inputName,
      onBlur: vi.fn(),
      onChange: vi.fn(),
      ref: vi.fn(),
    };
  };

  it("render text input when type prop is text", () => {
    render(
      <Input
        id="123"
        type="text"
        label="name"
        placeholder="enter name..."
        register={register("name")}
      />,
    );

    const nameInput = screen.getByRole("textbox", { name: "name" });

    expect(nameInput).toBeInTheDocument();
  });

  it("render textarea input when type prop is textarea", () => {
    render(
      <Input
        id="123"
        type="textarea"
        label="desc"
        placeholder="enter desc..."
        register={register("desc")}
      />,
    );

    const textAreaInput = screen.getByRole("textbox", { name: "desc" });

    expect(textAreaInput).toBeInTheDocument();
  });

  it("render password input when type prop is password", () => {
    render(
      <Input
        id="123"
        type="password"
        label="password"
        placeholder="......"
        register={register("password")}
      />,
    );

    const password = screen.getByPlaceholderText("......");

    expect(password).toBeInTheDocument();
  });

  it("should render error input correctly", () => {
    render(
      <Input
        id="123"
        type="text"
        label="username"
        error="username is required"
        placeholder="Enter username"
        register={register("username")}
      />,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
