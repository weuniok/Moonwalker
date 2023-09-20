import { Vector2 } from "./math";
import { svgPoints } from "./ui";

export function mountExplosion({ id }: { id: string }) {
  return `
    <svg id="${id}" x="40" y="40" class="explosion" style="display: flex;"></svg>
  `;
}

export function showExplosion(explosionPos: Vector2, markerPos?: Vector2) {
  const outerRadius = 16;
  const innerRadius = 8;

  const shipExplosion = document.getElementById(
    "ship-explosion"
  )! as unknown as SVGSVGElement;

  if (shipExplosion.style.display === "block") return;

  shipExplosion.style.display = "block";
  shipExplosion.setAttribute("x", `${explosionPos.x}`);
  shipExplosion.setAttribute("y", `${explosionPos.y}`);

  const strokeWidth = 1 + Math.round(Math.random());

  const spikes = Math.floor(Math.random() * 4) + 5; // Random number of spikes between 10 and 15
  const explosionPoints = Array.from({ length: spikes * 2 }, (_, i) => {
    const angle = (Math.PI / spikes) * i * (1.05 - Math.random() * 0.1);
    let radius = i % 2 === 0 ? innerRadius : outerRadius;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x: Math.floor(x), y: Math.floor(y) };
  });
  explosionPoints.push(explosionPoints[0]);

  const points = svgPoints(explosionPoints);
  markerPos &&= markerPos.subtract(explosionPos);
  shipExplosion.innerHTML = `
    ${
      markerPos
        ? `<circle cx="${markerPos.x}" cy="${markerPos.y}" r="3" />`
        : ""
    }
    <polyline stroke-width="${strokeWidth}" points="${points}" />
  `;
}
