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
            className={"transition-all ease-in-out"}
          >
            ❤️
          </span>
        ))}
    </>
  );
}
