import { FC } from "react";
import { Logo } from "./Logo";

interface StartProps {
  onClick: () => void;
}

export const StartModal: FC<StartProps> = ({ onClick }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 absolute z-10 backdrop-blur-lg">
      <div className="bg-white max-w-xl w-full h-1/4 flex flex-col items-center justify-center rounded-3xl px-30 gap-5">
        <Logo />
        <h1 className="text-5xl font-semibold mb-4 text-center leading-tight">
          Welcome to hexhunter!
        </h1>
        <button
          className="bg-sky-500 w-1/2 text-white p-4 rounded-full shadow-xl font-bold py-4 text-xl"
          onClick={onClick}
        >
          Play
        </button>
      </div>
    </div>
  );
};
