import { render, screen } from "@testing-library/react";
import { Game } from "./Game";

test("renders Game component without crashing", () => {
  render(<Game />);
  expect(screen.getByTestId("timer")).toBeInTheDocument();
});

test("displays the correct score", () => {
  render(<Game />);
  const scoreElement = screen.getByText(/Score:/i);
  expect(scoreElement).toBeInTheDocument();
});

test("displays the correct number of lives", () => {
  render(<Game />);
  const livesElement = screen.getByText(/Lives:/i);
  expect(livesElement).toBeInTheDocument();
});

test("displays the correct color question", () => {
  render(<Game />);
  const colorQuestion = screen.getByText(/Which one is/i);
  expect(colorQuestion).toBeInTheDocument();
});

test("renders the correct number of color cards", () => {
  render(<Game />);
  const colorCards = screen.getAllByTestId("color-card");
  expect(colorCards.length).toBe(4);
});
