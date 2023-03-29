import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ColorCard } from "./ColorCard";
import { AnswerPopup } from "./AnswerPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useGameLogic } from "../hooks/useGameLogic";
import { Hearts } from "./Hearts";
import { getColor } from "../helpers/hexHelpers";
import { useGame } from "../context/context";

interface GameProps {}

export const Game: FC<GameProps> = () => {
  const {
    hexValues,
    correct,
    wrong,
    handleAnswer,
    correctAnswer,
    score,
    lives,
    handleRound,
  } = useGameLogic();

  const { round, roundTime, minusLife } = useGame();

  return (
    <>
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
            <FontAwesomeIcon icon={faSquareCheck} color={"#1abb1a"} /> Correct!
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

        <motion.div
          key={round}
          data-testid="timer"
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
      </div>
    </>
  );
};
