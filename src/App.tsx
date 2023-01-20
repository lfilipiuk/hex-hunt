import { FC, useEffect, useMemo, useState } from "react";
import { getColor, getRandomHexColor } from "./helpers/hexHelpers";
import { ColorCard } from "./components/ColorCard";
import { Hearts } from "./components/Hearts";
import { useGame } from "./context/context";
import { AnimatePresence, motion } from "framer-motion";
import { GameOverModal } from "./components/GameOverModal";
import { StartModal } from "./components/StartModal";
import { Logo } from "./components/Logo";
import { AnswerPopup } from "./components/AnswerPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";

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
      handleCorrectAnswer();
    } else {
      minusLife();
      handleWrongAnswer();
    }
    handleRound();
  };

  function handleCorrectAnswer() {
    setCorrect(true);
    setTimeout(() => {
      setCorrect(false);
    }, 500);
  }

  function handleWrongAnswer() {
    setWrong(true);
    setTimeout(() => {
      setWrong(false);
    }, 500);
  }

  return (
    <div className={""}>
      <div className={"flex flex-col select-none h-screen items-center"}>
        <section className={"md:basis-1/4 basis-1/12 md:py-16 pt-8 pb-4"}>
          <Logo />
        </section>

        <section className={"md:basis-full flex flex-col items-center"}>
          <div className={"mx-auto flex flex-col items-center order-1"}>
            <h3 className={"text-gray-400 text-xl"}>Which one is</h3>
            <h1
              className={
                "md:text-6xl text-5xl md:py-5 my-2 font-semibold block md:h-28 h-14"
              }
            >
              {correctAnswer}
            </h1>
          </div>

          <div
            className={
              "grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:mt-10 mt-6 items-center justify-center md:w-full w-auto order-3"
            }
          >
            <AnimatePresence initial={false} mode={"sync"}>
              {hexValues.map((hexValue) => (
                <motion.div layout key={hexValues.indexOf(hexValue)}>
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

          <div className={"basis-full w-full max-w-sm order-2 md:order-3"}>
            <div
              className={
                "absolute left-1/2 md:bottom-28 transform -translate-x-1/2 -translate-y-32 md:-translate-y-0"
              }
            >
              <AnswerPopup show={correct}>
                <FontAwesomeIcon icon={faSquareCheck} color={"#1abb1a"} />{" "}
                Correct!
              </AnswerPopup>
              <AnswerPopup show={wrong}>
                <FontAwesomeIcon icon={faSquareXmark} color={"#f00"} /> Wrong!
              </AnswerPopup>
            </div>

            <div
              className={
                "text-2xl h-full grid grid-cols-2 items-end justify-items-start md:py-16"
              }
            >
              <h3 className={""}>Score: {score}</h3>
              <h3 className={"flex"}>
                Lives:
                <div className={"mx-1"}>
                  <Hearts lives={lives} />
                </div>
              </h3>
            </div>
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
            className="h-4 w-full fixed inset-x-0 top-0 md:bottom-0 md:top-auto bg-sky-500"
            initial={{ width: "100%" }}
            animate={{
              width: 0,
              transition: { duration: roundTime, ease: "linear" },
            }}
            onAnimationComplete={() => {
              minusLife();
              handleRound();
            }}
          />
          <div className="fixed -z-10 bg-gray-300 w-full h-4 inset-x-0 md:bottom-0 md:top-auto top-0" />
        </>
      )}
    </div>
  );
};

export default App;
