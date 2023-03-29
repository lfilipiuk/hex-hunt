import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface HeartsProps {
  lives: number;
}

export const Hearts: FC<HeartsProps> = ({ lives }) => {
  if (lives < 0) {
    throw new Error("Lives cannot be negative");
  }

  const renderHearts = () => {
    return Array.from({ length: lives }).map((_, i) => (
      <span
        key={i}
        className="transition-all ease-in-out px-0.5"
        role="img"
        aria-label="heart"
        data-testid="heart"
      >
        <FontAwesomeIcon icon={faHeart} color={"#f00"} />
      </span>
    ));
  };

  return <>{renderHearts()}</>;
};
