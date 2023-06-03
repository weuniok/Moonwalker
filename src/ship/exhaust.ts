import { Vector2 } from "../math";
import { svgPoints } from "../ui";
import { ShipState } from "./types";

export function createExhaust({
  shipWidth,
  shipHeight,
  maxThrust,
}: {
  shipWidth: number;
  shipHeight: number;
  maxThrust: number;
}) {
  const exhaustShape = [
    new Vector2(-shipWidth / 2, shipHeight / 2 + shipWidth / 16),
    new Vector2(-1 * (shipWidth / 7), shipHeight),
    new Vector2(1 * (shipWidth / 7), shipHeight),
    new Vector2(shipWidth / 2, shipHeight / 2 + shipWidth / 16),
  ];

  function updateExhaustUI({ thrust }: ShipState) {
    const exhaust = document.getElementById(
      "spaceship-exhaust"
    )! as any as SVGPolylineElement;
    const exhaustOpacity = thrust / maxThrust;

    exhaust.style.strokeOpacity = String(exhaustOpacity);
  }

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
