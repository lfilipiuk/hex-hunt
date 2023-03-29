import { FC } from "react";
import { Logo } from "./Logo";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";

interface StartProps {
  onClick: () => void;
}

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition: Transition = { duration: 0.3 };

export const StartModal: FC<StartProps> = ({ onClick }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 backdrop-blur-lg select-none">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={transition}
          className="bg-white max-w-xl w-full h-96 flex flex-col items-center justify-center rounded-3xl px-30 gap-5 md:p-0 m-4"
        >
          <Logo />
          <h1 className="text-5xl font-semibold mb-4 text-center leading-tight">
            Welcome to hexhunter!
          </h1>
          <button
            className="bg-skyblue w-72 text-white p-4 rounded-full shadow-xl font-bold py-4 text-xl hover:bg-skyblue-dark transition-all ease-in-out duration-300"
            onClick={onClick}
          >
            Play
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
