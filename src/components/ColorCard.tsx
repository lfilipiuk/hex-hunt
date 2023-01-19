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
      className={"h-80 w-64 m-4 cursor-pointer shadow-xl relative p-2 bg-white"}
    >
      <div
        className={"h-4/5"}
        style={{ backgroundColor: props.backgroundColor }}
      ></div>
      {/*<h3 className={"opacity-20 text-sm"}>{props.backgroundColor}</h3>*/}
      <h3
        className={
          "text-lg font-semibold text-gray-800 text-center mx-auto py-5"
        }
      >
        {props.name}
      </h3>
    </motion.div>
  );
}
