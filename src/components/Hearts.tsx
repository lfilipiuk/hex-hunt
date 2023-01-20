import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export function Hearts(props: { lives: number }) {
  return (
    <>
      {Array(props.lives)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            role="img"
            aria-label="heart"
            className={"transition-all ease-in-out px-0.5"}
          >
            <FontAwesomeIcon icon={faHeart} color={"#f00"} />
          </span>
        ))}
    </>
  );
}
