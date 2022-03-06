import { ShipState } from "./types";
import { Vector2 } from "../math";


export function createFlightPathPrediction() {
  return {
    render() {
      return `
        <line
          id="spaceship-path-prediction"
          x1="0"
          x2="150"
          y1="0"
          y2="150"
          stroke="var(--slate-700)"
          stroke-width="2"
          stroke-dasharray="4 4 4 4"
        />
      `;
    },
    update({ position, velocity }: ShipState) {
      const a = new Vector2(position.x, position.y);
      const b = a.add(velocity.multiplyScalar(100));
    
      const pathIndicator = document.getElementById("spaceship-path-prediction")!;
    
      pathIndicator.setAttribute("x1", String(a.x));
      pathIndicator.setAttribute("y1", String(a.y));
      pathIndicator.setAttribute("x2", String(b.x));
      pathIndicator.setAttribute("y2", String(b.y));
    }
  }
}