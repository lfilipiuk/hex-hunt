import { FC } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const Logo: FC = () => {
  return (
    <motion.ul
      className="w-64 h-64 grid grid-cols-2 grid-rows-2 gap-4 p-4 list-none overflow-hidden bg-gray-400 rounded-3xl opacity-20 mx-auto m-5"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.li
          key={index}
          className="bg-white rounded-full"
          variants={item}
        />
      ))}
    </motion.ul>
  );
};
