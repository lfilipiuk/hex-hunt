import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ColorCard } from "./ColorCard";

describe("ColorCard", () => {
  const backgroundColor = "#ff0000";
  const colorName = "Red";
  const mockOnClick = jest.fn();

  it("renders the color card with the correct background color and color name", () => {
    render(
      <ColorCard
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
        name={colorName}
      />
    );

    const colorCard = screen.getByTestId("color-card-background");
    expect(colorCard).toHaveStyle(`background-color: ${backgroundColor}`);
    expect(screen.getByText(colorName)).toBeInTheDocument();
  });

  it("calls the onClick function with the correct color when clicked", () => {
    render(
      <ColorCard
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
        name={colorName}
      />
    );

    const colorCard = screen.getByTestId("color-card");

    // Trigger the onTap event instead of the click event
    fireEvent(colorCard, new MouseEvent("pointerdown", { bubbles: true }));
    fireEvent(colorCard, new MouseEvent("pointerup", { bubbles: true }));

    expect(mockOnClick).toHaveBeenCalledWith(backgroundColor);
  });

  it("renders the color name", () => {
    render(
      <ColorCard
        backgroundColor={backgroundColor}
        onClick={mockOnClick}
        name={colorName}
      />
    );

    expect(screen.getByText(colorName)).toBeInTheDocument();
  });
});
