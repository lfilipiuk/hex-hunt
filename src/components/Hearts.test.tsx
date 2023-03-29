import React from "react";
import { render, screen } from "@testing-library/react";
import { Hearts } from "./Hearts";

describe("Hearts component", () => {
  test("renders correct number of hearts based on lives prop", () => {
    render(<Hearts lives={3} />);
    const heartElements = screen.getAllByRole("img", { name: "heart" });
    expect(heartElements.length).toBe(3);
  });

  test("renders no hearts when lives prop is 0", () => {
    render(<Hearts lives={0} />);
    const heartElements = screen.queryAllByRole("img", { name: "heart" });
    expect(heartElements.length).toBe(0);
  });

  test("throws an error if lives prop is not greater than 0", () => {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {});

    const renderHeartsWithInvalidLives = () => render(<Hearts lives={-1} />);
    expect(renderHeartsWithInvalidLives).toThrowError(
      "Lives cannot be negative"
    );

    spy.mockRestore();
  });
});
