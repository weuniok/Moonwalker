import { Vector2 } from "./math";
import { svgPoints } from "./ui";

export function mountExplosion({ id }: { id: string }) {
  return `
    <svg id="${id}" x="40" y="40" class="explosion" style="display: none;"></svg>
  `;
}

export function showExplosion(position: Vector2) {
  const outerRadius = 14;
  const innerRadius = 7;

  const shipExplosion = document.getElementById(
    "ship-explosion"
  )! as unknown as SVGSVGElement;

  if (shipExplosion.style.display === "block") return;

  shipExplosion.style.display = "block";
  shipExplosion.setAttribute("x", `${position.x}`);
  shipExplosion.setAttribute("y", `${position.y}`);

  const strokeWidth = 1 + Math.round(Math.random());

  const spikes = Math.floor(Math.random() * 4) + 5; // Random number of spikes between 10 and 15
  const explosionPoints = Array.from({ length: spikes * 2 }, (_, i) => {
    const angle = (Math.PI / spikes) * i * (1.05 - Math.random() * 0.1);
    let radius = i % 2 === 0 ? innerRadius : outerRadius;
    const x = 5 + radius * Math.cos(angle);
    const y = 5 + radius * Math.sin(angle);
    return { x: Math.floor(x), y: Math.floor(y) };
  });
  explosionPoints.push(explosionPoints[0]);

  const points = svgPoints(explosionPoints);
  shipExplosion.innerHTML = `<polyline stroke-width="${strokeWidth}" points="${points}" />`;
}
