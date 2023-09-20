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
  const spikes = Math.floor(Math.random() * 5) + 4; // Random number of spikes between 10 and 15
  const explosionPoints = Array.from({ length: spikes * 2 }, (_, i) => {
    const angle = (Math.PI / spikes) * i; // adjust angle for number of spikes
    const radius = i % 2 === 0 ? 5 : 10; // alternate between inner and outer points
    const x = 5 + radius * Math.cos(angle);
    const y = 5 + radius * Math.sin(angle);
    return { x: Math.floor(x), y: Math.floor(y) };
  });
  explosionPoints.push(explosionPoints[0]);

  return `
    <svg x="40" y="40" class="explosion">
      <polyline points="${svgPoints(explosionPoints)}" />
    </svg>
  `;
}
