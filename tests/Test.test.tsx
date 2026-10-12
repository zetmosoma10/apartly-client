import { render, screen } from "@testing-library/react";

describe.skip("Test Suit", () => {
  it("Test Case", () => {
    render(<h1>Hello World</h1>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
