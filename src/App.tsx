import { FC, useEffect, useMemo, useState } from "react";
import { getColor, getRandomHexColor } from "./helpers/hexHelpers";
import { ColorCard } from "./components/ColorCard";
import { Timer } from "./components/Timer";
import { Hearts } from "./components/Hearts";
import { useGame } from "./context/context";
import { Logo } from "./components/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { Intro } from "./components/Intro";
import { ROUND_TIME } from "./helpers/config";

interface AppProps {}

//TODO - TABSWITCH
//FIXME - doesn't draw new colors on timer end

function getBestScore() {
  const bestScore = localStorage.getItem("bestScore");
  if (bestScore) {
    return parseInt(bestScore);
  }
  return 0;
}

function setBestScore(score: number) {
  localStorage.setItem("bestScore", score.toString());
}

// eslint-disable-next-line no-empty-pattern
const App: FC<AppProps> = ({}) => {
  const [hexValues, setHexValues] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

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

  const clearColors = () => {
    setHexValues([]);
  };

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

  //useeffect to track user lives and react if there is game over
  useEffect(() => {
    if (lives === 0) {
      if (score > getBestScore()) {
        setBestScore(score);
      }
      setGameOver(true);
    }
  }, [lives, score]);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleRetry = () => {
    resetGame();
    clearColors();
    setGameOver(false);
  };

  const handleRound = () => {
    increaseRound();
    resetTimer();
    clearColors();
  };

  const correctAnswer = hexValues[randomIndex];

  const handleAnswer = (answer: string) => {
    if (answer === correctAnswer) {
      setScore(score + 100);
    } else {
      minusLife();
    }
    handleRound();
  };

  return (
    <div>
      {!isStarted ? (
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <Logo />
          <h1 className={"text-3xl font-bold"}>Hex Hunt</h1>
          <button
            className={
              "bg-blue-600 text-white p-4 rounded-xl shadow-xl w-40 uppercase"
            }
            onClick={handleStart}
          >
            Start
          </button>
          <Intro />
        </div>
      ) : gameOver ? (
        <div className={"flex flex-col items-center justify-center gap-4"}>
          <h1 className={"text-3xl font-bold"}>Game Over</h1>
          <h1> Your score is </h1>
          <h1 className={"text-3xl font-bold"}>{score}</h1>
          <h1> Best score is </h1>
          <h1 className={"text-3xl font-bold"}>{getBestScore()}</h1>

          <button
            className={
              "bg-blue-600 text-white p-4 rounded-xl shadow-xl w-40 uppercase"
            }
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className={"mx-auto w-2/3 py-12"}>
          <motion.progress
            key={round}
            className="h-8 bg-blue-200 w-full"
            initial={{ width: "100%" }}
            animate={{
              width: 0,
              transition: { duration: roundTime, ease: "linear" },
            }}
            onAnimationComplete={() => {
              minusLife();
              handleRound();
            }}
            max={ROUND_TIME}
          />
          <div className={"flex justify-between"}>
            <div className={"flex flex-col text-2xl"}>
              {/*<Timer onTimeUp={minusLife} />*/}
              {/*<h3>Round: {round}</h3>*/}
              <h3 className={"flex"}>
                Lives:
                <div>
                  <Hearts lives={lives} />
                </div>
              </h3>
              <h3>Score: {score}</h3>
            </div>
          </div>

          <div className={"flex flex-col justify-center items-center"}>
            <h1 className={"text-6xl py-5 font-semibold block h-28"}>
              {correctAnswer}
            </h1>
          </div>

          <div className={"flex items-center justify-center"}>
            <AnimatePresence initial={false} mode={"sync"}>
              {hexValues.map((hexValue) => (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={hexValue}
                >
                  <ColorCard
                    key={hexValue}
                    backgroundColor={hexValue}
                    onClick={handleAnswer}
                    name={getColor(hexValue).name}
                    correctAnswer={correctAnswer}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
