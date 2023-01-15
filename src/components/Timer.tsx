import { useEffect, FC } from "react";
import { useGame } from "../context/context";

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer: FC<TimerProps> = ({ onTimeUp }) => {
  const { roundTime, setRoundTime, resetTimer } = useGame();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRoundTime((prevTimeLeft: any) => {
        if (prevTimeLeft === 0) {
          clearInterval(intervalId);
          onTimeUp();
          resetTimer();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeUp, resetTimer, setRoundTime]);

  return <div>Time left: {roundTime}</div>;
};
