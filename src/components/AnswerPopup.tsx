import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function AnswerPopup(props: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={"text-2xl font-medium bg-white p-3 rounded-full"}>
            {props.children}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
