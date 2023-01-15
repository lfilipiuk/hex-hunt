// @ts-ignore
import nearestColor from "nearest-color";
import colorNameList from "color-name-list";

/* This function returns a string with a random hexadecimal color code.
   The 'Math.random() * 16777215' part generates a random number between
   0 and 16777215 (hexadecimal FF0000 is 16777215). The '.toString(16)'
   part converts it to a string in hexadecimal format. The '.padStart(6, 0)'
   part adds leading zeroes to the string if its length is less than 6 characters.
   Finally, the '#${}' part prepends a '#' to the string to make it a valid
   hexadecimal color code.
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
