import { Vector2 } from "../math";
import { svgPoints } from "../ui";
import { ShipState } from "./types";

export function createTrail() {
  //
  const lastPositions: { x: number; y: number }[] = [];

  return {
    render(): string {
      return `
        <polyline
          id="spaceship-trail"
          points="${svgPoints(lastPositions)}"
          fill="none"
          stroke="var(--slate-200)"
          stroke-width="15"
          stroke-opacity="0.02"
          stroke-dasharray="20 20 20"
        />
      `;
    },
    update({ position }: ShipState): void {
      lastPositions.push({ ...position });
      if (lastPositions.length > 75) {
        lastPositions.shift();
      }

      const element = document.getElementById(`spaceship-trail`)!;
      element.setAttribute("points", svgPoints(lastPositions));
    },
  };
}
