import { motion } from "framer-motion";

export function ColorCard(props: {
  backgroundColor: string;
  onClick: (answer: string) => void;
  name: string;
  correctAnswer: string;
}) {
  const handleClick = () => {
    props.onClick(props.backgroundColor);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: [0.9] }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onTap={handleClick}
      className={
        "md:h-80 h-36 w-96 md:w-64 md:m-4 cursor-pointer shadow-xl relative p-3 md:p-2 bg-white flex flex-row-reverse md:flex-col items-center justify-between md:justify-center"
      }
    >
      <div
        className={"md:h-4/5 h-full w-full basis-1/3 md:basis-4/5"}
        style={{ backgroundColor: props.backgroundColor }}
      ></div>
      <h3
        className={
          "text-lg font-semibold text-gray-800 md:text-center py-5 basis-2/3 md:basis-1/5"
        }
      >
        {props.name}
      </h3>
    </motion.div>
  );
}
