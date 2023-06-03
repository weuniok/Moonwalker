import { svgPoints } from "../ui";
import { ShipState } from "./types";

export function createTrail(
  id: string,
  {
    stroke = "var(--slate-200)",
    strokeWidth = 15,
    strokeOpacity = 0.02,
    strokeDasharray = "20 20 20",
  } = {}
) {
  //
  const lastPositions: { x: number; y: number }[] = [];

  return {
    render(): string {
      return `
        <polyline
          id="${id}"
          points="${svgPoints(lastPositions)}"
          fill="none"
          stroke="${stroke}"
          stroke-width="${strokeWidth}"
          stroke-opacity="${strokeOpacity}"
          stroke-dasharray="${strokeDasharray}"
        />
      `;
    },
    update({ position }: Pick<ShipState, "position">): void {
      lastPositions.push({ ...position });
      if (lastPositions.length > 75) {
        lastPositions.shift();
      }

      const element = document.getElementById(id)!;
      element.setAttribute("points", svgPoints(lastPositions));
    },
  };
}
