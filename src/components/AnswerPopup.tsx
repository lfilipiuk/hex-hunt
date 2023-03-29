import { FC, ReactNode } from "react";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";

interface AnswerPopupProps {
  show: boolean;
  children: ReactNode;
}

const motionVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition: Transition = { duration: 0.3 };

export const AnswerPopup: FC<AnswerPopupProps> = ({ show, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={motionVariants}
          transition={transition}
        >
          <h1 className="text-2xl font-medium bg-white p-3 rounded-full">
            {children}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
