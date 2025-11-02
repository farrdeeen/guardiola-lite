export const namedColorsToHex: { [key: string]: string } = {
  blue: "#0000FF",
  red: "#FF0000",
  green: "#008000",
  yellow: "#FFFF00",
  black: "#000000",
  white: "#FFFFFF",
  // add more named colors as needed
};

export function getHexColor(color: string) {
  return color.startsWith("#")
    ? color
    : namedColorsToHex[color.toLowerCase()] || "#000000";
}
