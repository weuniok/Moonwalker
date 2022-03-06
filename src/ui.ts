import { Vector2 } from "./math";

export function toAttributesString(
  x: number,
  y: number,
  width: number,
  height: number
) {
  return Object.entries({ x, y, width, height })
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}

export function svgPoints(points: { x: number; y: number }[]) {
  return points.map((v) => `${v.x},${v.y}`).join(" ");
}
