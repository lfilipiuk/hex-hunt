import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameOverModal } from "./GameOverModal";

describe("GameOverModal", () => {
  const mockOnClick = jest.fn();

  it("renders correctly with the given score and best score", () => {
    render(<GameOverModal score={100} bestScore={200} onClick={mockOnClick} />);

    expect(screen.getByText("Game over!")).toBeInTheDocument();
    expect(screen.getByText("You scored 100 points")).toBeInTheDocument();
    expect(screen.getByText("Your best score is 200")).toBeInTheDocument();
  });

  it('calls onClick function when "Try again" button is clicked', () => {
    render(<GameOverModal score={100} bestScore={200} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText("Try again"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
