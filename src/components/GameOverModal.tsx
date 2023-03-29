import { FC } from "react";
import { Logo } from "./Logo";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";

interface GameOverProps {
  score: number;
  bestScore: number;
  onClick: () => void;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition: Transition = { duration: 0.5 };

export const GameOverModal: FC<GameOverProps> = ({
  score,
  bestScore,
  onClick,
}) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 backdrop-blur-lg select-none">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={transition}
          className="bg-white max-w-xl w-full h-96 flex flex-col items-center justify-center rounded-3xl px-30 gap-5 md:p-0 m-4"
        >
          <Logo />
          <h1 className="text-5xl font-semibold">Game over!</h1>
          <div className="font-medium text-gray-400 text-4xl text-center">
            You scored {score} points
          </div>
          <div className="font-medium text-xl">
            Your best score is {bestScore}
          </div>
          <button
            className="bg-skyblue w-72 text-white p-4 rounded-full shadow-xl font-bold py-4 text-xl hover:bg-skyblue-dark transition-all ease-in-out duration-300"
            onClick={onClick}
          >
            Try again
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
