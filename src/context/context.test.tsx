import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { GameProvider, useGame } from "./context";

const TestComponent = () => {
  const { lives, score, round, minusLife, resetGame, increaseRound } =
    useGame();

  return (
    <div>
      <div data-testid="lives">{lives}</div>
      <div data-testid="score">{score}</div>
      <div data-testid="round">{round}</div>
      <button data-testid="minus-life" onClick={minusLife}>
        Minus Life
      </button>
      <button data-testid="reset-game" onClick={resetGame}>
        Reset Game
      </button>
      <button data-testid="increase-round" onClick={increaseRound}>
        Increase Round
      </button>
    </div>
  );
};

describe("Game context", () => {
  it("provides initial values", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    expect(screen.getByTestId("lives")).toHaveTextContent("3");
    expect(screen.getByTestId("score")).toHaveTextContent("0");
    expect(screen.getByTestId("round")).toHaveTextContent("1");
  });

  it("updates lives when minusLife is called", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    fireEvent.click(screen.getByTestId("minus-life"));
    expect(screen.getByTestId("lives")).toHaveTextContent("2");
  });

  it("resets game values when resetGame is called", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    fireEvent.click(screen.getByTestId("reset-game"));

    expect(screen.getByTestId("lives")).toHaveTextContent("3");
    expect(screen.getByTestId("score")).toHaveTextContent("0");
    expect(screen.getByTestId("round")).toHaveTextContent("1");
  });

  it("increases round when increaseRound is called", () => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    fireEvent.click(screen.getByTestId("increase-round"));
    expect(screen.getByTestId("round")).toHaveTextContent("2");
  });
});
