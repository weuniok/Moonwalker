import { toAttributesString } from "./ui";

export function createGround() {
  const x = -25;
  const y = 900;
  const width = 1100;
  const height = 100;

  return {
    render() {
      return `
        <rect
          ${toAttributesString(x, y, width, height)}
          fill="none"
          stroke="hsl(0 0% 30%)"
        >
      `;
    },
  };
}
