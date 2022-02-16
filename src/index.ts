import { createHud } from "./hud";
import { createShip } from "./ship";
import { keyboardControls } from "./keyboardControls";

import "./index.css";

const hud = createHud();
const ship = createShip();
const keyboard = keyboardControls();

let lastFrameTime = Date.now();

function update() {
  const now = Date.now();
  const deltaTime = now - lastFrameTime;

  hud.calculateFps(deltaTime);
  ship.update(deltaTime, keyboard);

  lastFrameTime = now;
  requestAnimationFrame(() => update());
}

document.getElementById("app")!.innerHTML = `
  ${hud.html()}
  ${ship.html()}
`;

update();
hud.scheduleUpdates();
