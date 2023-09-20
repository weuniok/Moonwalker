import { createHud } from "./hud";
import { createShip } from "./ship";
import { keyboardControls } from "./keyboardControls";
import { createGround } from "./ground";
import { mountExplosion, showExplosion } from "./explosions";

import "./index.css";

const keyboard = keyboardControls();
const ship = createShip(keyboard);
const ground = createGround();

const hud = createHud({ getShipStats: ship.readState });

let lastFrameTime = Date.now();
let isGameOver = false;

function update() {
  // we end the game randomly until we detect collisions
  const MISFORTUNE = 0.0025;
  let luck = Math.random();
  if (luck < MISFORTUNE) {
    isGameOver = true;
  }

  if (isGameOver) {
    showExplosion(ship.readState().position);
    return;
  }

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
  ${mountExplosion({ id: "ship-explosion" })}
`;

update();
hud.scheduleUpdates();
