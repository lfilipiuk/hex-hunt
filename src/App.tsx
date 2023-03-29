import { FC } from "react";
import { Game } from "./components/Game";
import { GameOverModal } from "./components/GameOverModal";
import { StartModal } from "./components/StartModal";
import { Logo } from "./components/Logo";
import { useGameLogic } from "./hooks/useGameLogic";
import { getBestScore } from "./helpers/score";
import { useGame } from "./context/context";

interface AppProps {}

const App: FC<AppProps> = () => {
  const { gameOver, isStarted, handleStart, handleRetry } = useGameLogic();

  const { score } = useGame();

  return (
    <div data-testid="app">
      <div className={"flex flex-col select-none h-screen items-center"}>
        <section className={"md:basis-1/4 basis-1/12 md:py-16 pt-8 pb-4"}>
          <Logo />
        </section>

        <section className={"md:basis-full flex flex-col items-center"}>
          {isStarted && !gameOver && <Game />}
        </section>
      </div>

      {!isStarted ? (
        <StartModal onClick={handleStart} />
      ) : (
        gameOver && (
          <GameOverModal
            score={score}
            bestScore={getBestScore()}
            onClick={handleRetry}
          />
        )
      )}
    </div>
  );
};

export default App;
