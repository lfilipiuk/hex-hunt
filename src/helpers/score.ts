export function getBestScore() {
  const bestScore = localStorage.getItem("bestScore");
  if (bestScore) {
    return parseInt(bestScore);
  }
  return 0;
}

export function setBestScore(score: number) {
  localStorage.setItem("bestScore", score.toString());
}
