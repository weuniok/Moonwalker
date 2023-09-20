import { createHud } from "./hud";
import { createShip } from "./ship";
import { keyboardControls } from "./keyboardControls";
import { createGround } from "./ground";

import "./index.css";
import { svgPoints } from "./ui";

const keyboard = keyboardControls();
const ship = createShip(keyboard);
const ground = createGround();

const hud = createHud({ getShipStats: ship.readState });

let lastFrameTime = Date.now();

function update() {
  const now = Date.now();
  const deltaTime = now - lastFrameTime;

  hud.calculateFps(deltaTime);
  ship.update(deltaTime);

  lastFrameTime = now;
  requestAnimationFrame(() => update());
}

document.getElementById("hud")!.innerHTML = hud.render();
document.getElementById("canvas")!.innerHTML = `
  ${ship.render()}
  ${ground.render()}
  ${mountExplosion()}
`;

update();
hud.scheduleUpdates();

function mountExplosion() {
  const outerRadius = 14;
  const innerRadius = 7;
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

  return `
    <svg x="40" y="40" class="explosion">
      <polyline stroke-width="${strokeWidth}" points="${svgPoints(
    explosionPoints
  )}" />
    </svg>
  `;
}
