//create game context - lives, score, level, etc
import React, { createContext, FC, useContext, useState } from "react";
import { ROUND_TIME } from "../helpers/config";

const GameContext = createContext({
  lives: 3,
  score: 0,
  round: 1,
  roundTime: 15,
  setScore: (score: number) => {},
  setRoundTime: (roundTime: (prevTimeLeft: any) => number | number) => {},
  resetGame: () => {},
  minusLife: () => {},
  resetTimer: () => {},
  increaseRound: () => {},
});

export function useGame() {
  return useContext(GameContext);
}

interface GameProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [roundTime, setRoundTime] = useState(15);

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setRound(1);
    setRoundTime(ROUND_TIME);
  };

  const minusLife = () => {
    setLives((prevLives) => prevLives - 1);
  };

  const resetTimer = () => {
    setRoundTime(ROUND_TIME);
  };

  const increaseRound = () => {
    setRound((prevRound) => prevRound + 1);
  };

  return (
    <GameContext.Provider
      value={{
        lives,
        score,
        round,
        roundTime,
        setScore,
        setRoundTime,
        resetGame,
        minusLife,
        resetTimer,
        increaseRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
