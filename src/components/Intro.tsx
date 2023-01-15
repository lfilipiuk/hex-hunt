import { FC } from "react";

export const Intro: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <h1 className="text-3xl font-bold mb-4">Rules</h1>
      <p className="mb-4">
        Click the color that matches the color name. You have 3 lives.
      </p>
      <p className="mb-4">
        You have 15 seconds to answer each question. If you don't answer in
        time, you lose a life.
      </p>
      <p className="mb-4">
        If you answer correctly, you get 100 points. If you answer incorrectly,
        you lose a life.
      </p>
      <p className="mb-4">
        If you lose all your lives, the game is over. You can try again by
        clicking the "Retry" button.
      </p>
      <h1 className={"text-3xl font-bold my-4"}>How HEX colors work?</h1>
      <p className={"my-2"}>
        Hex colors are used to make different colors on a computer screen. Just
        like how you use different colors of paint to make a painting, a
        computer uses different hex color codes to make different colors on the
        screen.
      </p>
      <p className={"my-2"}>
        Each hex color code is made up of{" "}
        <span className={"font-bold"}>6 letters and numbers</span>. For example,
        the hex color code for the color red is{" "}
        <span className={"font-bold"}>#FF0000</span>. The letters and numbers
        are used to tell the computer how much red, green, and blue to use to
        make the color.
      </p>
      <h2 className={"text-2xl my-4 font-bold"}>
        Here's a simple way to guess what hex color it is:
      </h2>
      <ul>
        <li>
          If the hex color code starts with #F, it's probably a shade of red,
          pink, or orange.
        </li>
        <li>
          If the hex color code starts with #0, it's probably a shade of green.
        </li>
        <li>
          {" "}
          If the hex color code starts with #00, it's probably a shade of blue.
        </li>
        <li>
          If the hex color code starts with #FF, it's probably a shade of
          yellow.
        </li>
        <li>
          If the hex color code starts with #FFFF, it's probably a shade of
          white.
        </li>
        <li>
          If the hex color code starts with #000000, it's probably a shade of
          black.
        </li>
      </ul>
      <p>
        You can also use a color picker to select a color and see the hex code
        for that color.
      </p>
      <p>
        The game you're playing is testing how well you know hex colors and
        their codes. You will see a color and 4 options of different hex codes,
        you need to choose the one that corresponds to the color you see.
      </p>
      <p>
        You can use these tips to help you guess the right hex code and get a
        higher score in the game!
      </p>
    </div>
  );
};
