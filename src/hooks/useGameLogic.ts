import { useCallback, useEffect, useMemo, useState } from "react";
import { useGame } from "../context/context";
import { getRandomHexColor } from "../helpers/hexHelpers";
import { getBestScore, setBestScore } from "../helpers/score";

export const useGameLogic = () => {
  const [hexValues, setHexValues] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const {
    lives,
    resetGame,
    minusLife,
    resetTimer,
    round,
    increaseRound,
    roundTime,
    setScore,
    score,
  } = useGame();

  const clearColors = useCallback(() => {
    setHexValues([]);
  }, []);

  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * hexValues.length);
  }, [hexValues.length]);

  useEffect(() => {
    if (hexValues.length < 4) {
      setHexValues((prev) => [
        getRandomHexColor(),
        getRandomHexColor(),
        getRandomHexColor(),
        getRandomHexColor(),
      ]);
    }
  }, [hexValues.length]);

  useEffect(() => {
    if (lives === 0) {
      if (score > getBestScore()) {
        setBestScore(score);
      }
      setGameOver(true);
    }
  }, [lives, score]);

  const handleStart = useCallback(() => {
    setIsStarted(true);
    clearColors();
  }, [clearColors]);

  const handleRetry = useCallback(() => {
    resetGame();
    clearColors();
    setGameOver(false);
  }, [resetGame, clearColors]);

  const handleRound = useCallback(() => {
    increaseRound();
    resetTimer();
    clearColors();
  }, [increaseRound, resetTimer, clearColors]);

  const correctAnswer = hexValues[randomIndex];

  const handleCorrectAnswer = useCallback(() => {
    setCorrect(true);
    setTimeout(() => {
      setCorrect(false);
    }, 500);
  }, []);

  const handleWrongAnswer = useCallback(() => {
    setWrong(true);
    setTimeout(() => {
      setWrong(false);
    }, 500);
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (answer === correctAnswer) {
        setScore(score + 100);
        handleCorrectAnswer();
      } else {
        minusLife();
        handleWrongAnswer();
      }
      handleRound();
    },
    [
      correctAnswer,
      minusLife,
      handleRound,
      setScore,
      score,
      handleCorrectAnswer,
      handleWrongAnswer,
    ]
  );

  return {
    hexValues,
    gameOver,
    isStarted,
    correct,
    wrong,
    handleStart,
    handleRetry,
    handleRound,
    handleAnswer,
    correctAnswer,
    score,
    lives,
    round,
    roundTime,
  };
};
