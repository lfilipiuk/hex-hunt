import { FC } from "react";
import { Logo } from "./Logo";
import { AnimatePresence, motion } from "framer-motion";

interface StartProps {
  onClick: () => void;
}

export const StartModal: FC<StartProps> = ({ onClick }) => {
  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 absolute z-10 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white max-w-xl w-full h-96 flex flex-col items-center justify-center rounded-3xl px-30 gap-5 md:p-0 m-4"
        >
          <Logo />
          <h1 className="text-5xl font-semibold mb-4 text-center leading-tight">
            Welcome to hexhunter!
          </h1>
          <button
            className="bg-skyblue w-72 text-white p-4 rounded-full shadow-xl font-bold py-4 text-xl"
            onClick={onClick}
          >
            Play
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
