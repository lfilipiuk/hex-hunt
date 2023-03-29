import React, { createContext, FC, useContext, useState } from "react";
import { ROUND_TIME } from "../helpers/config";

interface GameContextValue {
  lives: number;
  score: number;
  round: number;
  roundTime: number;
  setScore: (score: number) => void;
  setRoundTime: (roundTime: (prevTimeLeft: any) => number) => void;
  resetGame: () => void;
  minusLife: () => void;
  resetTimer: () => void;
  increaseRound: () => void;
}

const GameContext = createContext<GameContextValue>({
  lives: 3,
  score: 0,
  round: 1,
  roundTime: 15,
  setScore: (score: number) => {},
  setRoundTime: (roundTime: (prevTimeLeft: any) => number) => {},
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
  const [roundTime, setRoundTime] = useState(ROUND_TIME);

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
