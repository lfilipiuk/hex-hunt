import { useGameLogic } from "./useGameLogic";
import { GameProvider } from "../context/context";
import { setBestScore, getBestScore } from "../helpers/score";
import mocked = jest.mocked;
import { act, renderHook } from "@testing-library/react";

jest.mock("../helpers/score");

// Replace the 'jest.mock' line with the following:
const mockedSetBestScore = mocked(setBestScore);
const mockedGetBestScore = mocked(getBestScore);

describe("useGameLogic", () => {
  it("should initialize the game state correctly", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: GameProvider,
    });

    expect(result.current.hexValues).toHaveLength(4);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.isStarted).toBe(false);
    expect(result.current.correct).toBe(false);
    expect(result.current.wrong).toBe(false);
  });

  it("should start the game", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: GameProvider,
    });

    expect(result.current.isStarted).toBe(false);

    act(() => {
      result.current.handleStart();
    });

    expect(result.current.isStarted).toBe(true);
  });

  it("should handle correct answer", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.handleStart();
    });

    const initialScore = result.current.score;
    act(() => {
      result.current.handleAnswer(result.current.correctAnswer);
    });

    expect(result.current.score).toBe(initialScore + 100);
    expect(result.current.correct).toBe(true);
  });

  it("should handle wrong answer", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.handleStart();
    });

    const initialLives = result.current.lives;
    const wrongAnswer = result.current.hexValues.find(
      (hex) => hex !== result.current.correctAnswer
    );

    act(() => {
      if (wrongAnswer) {
        result.current.handleAnswer(wrongAnswer);
      }
    });

    expect(result.current.lives).toBe(initialLives - 1);
    expect(result.current.wrong).toBe(true);
  });

  it("should end the game and set best score", () => {
    mockedGetBestScore.mockReturnValue(0);

    const { result } = renderHook(() => useGameLogic(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.handleStart();
    });

    act(() => {
      result.current.handleAnswer(result.current.correctAnswer);
      result.current.handleAnswer("wrong answer");
      result.current.handleAnswer("wrong answer");
      result.current.handleAnswer("wrong answer");
    });

    expect(result.current.gameOver).toBe(true);
    expect(result.current.score).toBe(100);
    expect(mockedSetBestScore).toHaveBeenCalledWith(result.current.score);
  });

  it("should retry the game", () => {
    const { result } = renderHook(() => useGameLogic(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.handleStart();
    });

    act(() => {
      result.current.handleAnswer("wrong answer");
      result.current.handleAnswer("wrong answer");
      result.current.handleAnswer("wrong answer");
    });

    expect(result.current.gameOver).toBe(true);

    act(() => {
      result.current.handleRetry();
    });

    expect(result.current.gameOver).toBe(false);
    expect(result.current.lives).toBeGreaterThan(0);
  });
});
