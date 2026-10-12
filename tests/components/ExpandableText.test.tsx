import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpandableText from "../../src/components/ExpandableText";

describe("<ExpandableText/>", () => {
  const limit = 170;

  it("should renders nothing if children prop not passed", () => {
    const { container } = render(<ExpandableText />);

    expect(container.firstChild).toBeNull();
  });

  it("renders full text without a button if length is <= 170 characters", () => {
    const shortText = "This is a short description under 170 characters.";

    render(<ExpandableText>{shortText}</ExpandableText>);

    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("truncates text and shows 'Show more' button if length exceeds 170 characters", () => {
    const limit = 170;
    const longText = "A".repeat(limit + 1);
    const expectedText = "A".repeat(170) + "...";

    render(<ExpandableText>{longText}</ExpandableText>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show more/i }),
    ).toBeInTheDocument();
  });

  it("should render more paragraph when show more button clicked ", async () => {
    const user = userEvent.setup();
    const longText = "A".repeat(limit + 1);

    render(<ExpandableText>{longText}</ExpandableText>);

    const showMoreButton = screen.getByRole("button", { name: /show more/i });

    await user.click(showMoreButton);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show less/i }),
    ).toBeInTheDocument();
  });
});
