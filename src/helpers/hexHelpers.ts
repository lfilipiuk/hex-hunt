// @ts-ignore
import nearestColor from "nearest-color";
import colorNameList from "color-name-list";

/**
 * Generate a random hexadecimal color code as a string.
 * @returns {string} Random hexadecimal color code.
 */
export const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase()}`;
};

// nearestColor need objects {name => hex} as input
const colors = colorNameList.reduce(
  (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  {}
);

export const getColor = nearestColor.from(colors);
