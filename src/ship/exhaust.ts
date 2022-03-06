import { Vector2 } from "../math";
import { svgPoints } from "../ui";
import { ShipState } from "./types";
import { maxThrust, shipWidth, shipHeight } from "./constant";

const exhaustShape = [
  new Vector2(-shipWidth / 2, shipHeight / 2 + shipWidth / 16),
  new Vector2(-1 * (shipWidth / 7), shipHeight),
  new Vector2(1 * (shipWidth / 7), shipHeight),
  new Vector2(shipWidth / 2, shipHeight / 2 + shipWidth / 16),
];

export function createExhaust() {
  return {
    update: updateExhaustUI,
    render() {
      return `
        <polyline
          id="spaceship-exhaust"
          points="${svgPoints(exhaustShape)}"
          fill="none"
          stroke="#0ce4f0"
          stroke-width="2"
        />
      `;
    },
  };
}

function updateExhaustUI({ position, rotationAngle, thrust }: ShipState) {
  const element = document.getElementById("spaceship")! as any as SVGGElement;

  element.setAttribute(
    "transform",
    `translate(${position.x}, ${position.y}) rotate(${rotationAngle})`
  );

  const exhaust = document.getElementById(
    "spaceship-exhaust"
  )! as any as SVGPolylineElement;
  const exhaustOpacity = thrust / maxThrust;

  exhaust.style.strokeOpacity = String(exhaustOpacity);
}
