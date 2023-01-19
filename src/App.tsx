import { FC, useEffect, useMemo, useState } from "react";
import { getColor, getRandomHexColor } from "./helpers/hexHelpers";
import { ColorCard } from "./components/ColorCard";
import { Hearts } from "./components/Hearts";
import { useGame } from "./context/context";
import { AnimatePresence, motion } from "framer-motion";
import { GameOverModal } from "./components/GameOverModal";
import { StartModal } from "./components/StartModal";
import { Logo } from "./components/Logo";

interface AppProps {}

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

const App: FC<AppProps> = () => {
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
    clearColors();
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
    <div className={""}>
      <div className={"flex flex-col select-none h-screen items-center"}>
        <section className={"mx-auto basis-1/4 py-16"}>
          <Logo />
        </section>

        <section className={"basis-1/3"}>
          <div className={"mx-auto flex flex-col items-center"}>
            <h3 className={"text-gray-400 text-xl"}>Which one is</h3>
            <h1 className={"text-6xl py-5 font-semibold block h-28"}>
              {correctAnswer}
            </h1>
          </div>

          <div
            className={
              "grid xl:grid-cols-4 lg:grid-cols-2 gap-4 mx-auto mt-10 items-center justify-center"
            }
          >
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
        </section>

        <section className={"basis-1/3 w-96"}>
          <div className={"text-2xl h-full grid grid-cols-2 items-end py-16"}>
            <h3 className={""}>Score: {score}</h3>
            <h3 className={"flex"}>
              Lives:
              <div>
                <Hearts lives={lives} />
              </div>
            </h3>
          </div>
        </section>
      </div>

      {!isStarted ? (
        <StartModal onClick={handleStart} />
      ) : gameOver ? (
        <GameOverModal
          score={score}
          bestScore={getBestScore()}
          onClick={handleRetry}
        />
      ) : (
        <>
          <motion.div
            key={round}
            className="h-4 w-full fixed bottom-0 bg-sky-500"
            initial={{ width: "100%" }}
            animate={{
              width: 0,
              transition: { duration: roundTime, ease: "linear" },
            }}
            onAnimationComplete={() => {
              // minusLife();
              handleRound();
            }}
          />
          <div className="fixed -z-10 bg-gray-300 w-full h-4 bottom-0" />
        </>
      )}
    </div>
  );
};

export default App;
