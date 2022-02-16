import { createHud } from "./hud";
import { createShip } from "./ship";
import { keyboardControls } from "./keyboardControls";
import { createGround } from "./ground";

import "./index.css";

const hud = createHud();
const keyboard = keyboardControls();

const ship = createShip();
const ground = createGround();

let lastFrameTime = Date.now();

function update() {
  const now = Date.now();
  const deltaTime = now - lastFrameTime;

  hud.calculateFps(deltaTime);
  ship.update(deltaTime, keyboard);

  lastFrameTime = now;
  requestAnimationFrame(() => update());
}

document.getElementById("hud")!.innerHTML = hud.render();
document.getElementById("canvas")!.innerHTML = `
  ${ship.render()}
  ${ground.render()}
`;

update();
hud.scheduleUpdates();
