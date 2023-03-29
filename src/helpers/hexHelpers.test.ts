import { getRandomHexColor, getColor } from "./hexHelpers";

describe("hexHelpers", () => {
  describe("getRandomHexColor", () => {
    test("generates a valid hex color code", () => {
      const color = getRandomHexColor();
      const hexRegex = /^#[0-9A-F]{6}$/i;

      expect(color).toHaveLength(7);
      expect(hexRegex.test(color)).toBe(true);
    });
  });

  describe("getColor", () => {
    test("returns the correct color name for a given hex code", () => {
      const hexCode = "#FF0000";
      const expectedColorName = "Red";

      const colorName = getColor(hexCode).name;

      expect(colorName).toEqual(expectedColorName);
    });
  });
});
