import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StartModal } from "./StartModal";

describe("StartModal component", () => {
  test("renders StartModal correctly", () => {
    const mockOnClick = jest.fn();
    render(<StartModal onClick={mockOnClick} />);

    // Check if the logo and Play button are visible
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  test("triggers onClick on Play button click", () => {
    const mockOnClick = jest.fn();
    render(<StartModal onClick={mockOnClick} />);

    // Click the Play button and check if the onClick function is called
    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
