import { getBestScore, setBestScore } from "./score";

it("should return 0 when there is no best score in local storage", () => {
  localStorage.removeItem("bestScore");
  expect(getBestScore()).toBe(0);
});

it("should return the correct best score from local storage", () => {
  localStorage.setItem("bestScore", "50");
  expect(getBestScore()).toBe(50);
});

it("should save the correct score in local storage", () => {
  setBestScore(100);
  expect(localStorage.getItem("bestScore")).toBe("100");
});

it("should overwrite the existing best score in local storage", () => {
  localStorage.setItem("bestScore", "50");
  setBestScore(200);
  expect(localStorage.getItem("bestScore")).toBe("200");
});

it("should save the score as a string in local storage", () => {
  setBestScore(100);
  expect(typeof localStorage.getItem("bestScore")).toBe("string");
});
