import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import { GameProvider, useGame } from "./context/context";

jest.useFakeTimers();

const renderApp = () =>
  render(
    <GameProvider>
      <App />
    </GameProvider>
  );

const renderAppWithContext = () => {
  const Wrapper = () => {
    const { minusLife } = useGame();

    return (
      <div>
        <App />
        <button data-testid="minus-life" onClick={minusLife}>
          Minus Life
        </button>
      </div>
    );
  };

  return render(
    <GameProvider>
      <Wrapper />
    </GameProvider>
  );
};

describe("Game App", () => {
  test("starts the game when play button is clicked", () => {
    renderApp();
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);

    // After clicking the "Play" button, timer should be visible
    const timer = screen.getByTestId("timer");
    expect(timer).toBeInTheDocument();
  });

  test("handles game over and shows GameOverModal when the player runs out of lives", async () => {
    renderAppWithContext();
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);

    // Manually trigger game over by reducing lives to 0
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId("minus-life"));
    }

    // Check if the GameOverModal is shown
    const gameOverMessage = await screen.findByText("Game over!");
    expect(gameOverMessage).toBeInTheDocument();
  });

  test("retrying the game after game over resets the game state and allows starting a new game", async () => {
    renderAppWithContext();
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);

    // Manually trigger game over by reducing lives to 0
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId("minus-life"));
    }

    // Click the "Try again" button to reset the game
    const tryAgainButton = await screen.findByText("Try again");
    fireEvent.click(tryAgainButton);

    // Check if the game has been reset and the color cards are shown again
    const colorCard = screen.getAllByTestId("color-card");
    expect(colorCard).toHaveLength(4);
  });

  test("loses a life after waiting for 15 seconds", async () => {
    renderApp();
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);

    const initialLivesText = screen.getAllByTestId("heart");
    expect(initialLivesText).toHaveLength(3);

    // Advance the timers by 15 seconds
    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      const updatedLivesText = screen.getAllByTestId("heart");
      expect(updatedLivesText).toHaveLength(2);
    });
  });

  test("loses a game after waiting for 45 seconds", async () => {
    renderApp();
    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);

    const initialLivesText = screen.getAllByTestId("heart");
    expect(initialLivesText).toHaveLength(3);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      const twoLivesLeft = screen.getAllByTestId("heart");
      expect(twoLivesLeft).toHaveLength(2);
    });

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      const oneLifeLeft = screen.getAllByTestId("heart");
      expect(oneLifeLeft).toHaveLength(1);
    });

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      const zeroLivesLeft = screen.queryAllByTestId("heart");
      expect(zeroLivesLeft).toHaveLength(0);
    });

    // After 45 seconds, expect the game over message
    await waitFor(() => {
      const gameOverMessage = screen.getByText(/game over!/i);
      expect(gameOverMessage).toBeInTheDocument();
    });
  });
});
