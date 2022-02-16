export function toAttributesString(
  x: number,
  y: number,
  width: number,
  height: number) {
  return Object.entries({ x, y, width, height })
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}
