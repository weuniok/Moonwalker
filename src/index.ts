import { createHud } from "./hud";
import { createShip } from "./ship";
import { keyboardControls } from "./keyboardControls";
import { createGround } from "./ground";
import { mountExplosion, showExplosion } from "./explosions";
import { createCollisions } from "./collisions";

import "./index.css";
import { Vector2 } from "./math";
import { createLandingPad } from "./landingPad";

let shipExplosionPoint: Vector2 | null = null;

const keyboard = keyboardControls();
const ship = createShip(keyboard);
const ground = createGround();
const collisions = createCollisions(ship, ground, {
  onCollision(collidedVertex) {
    shipExplosionPoint = collidedVertex;
  },
});
const landingPad = createLandingPad(ground);

const hud = createHud({ getShipStats: ship.readState });

let lastFrameTime = Date.now();

function update() {
  const now = Date.now();
  const deltaTime = now - lastFrameTime;

  hud.calculateFps(deltaTime);

  if (shipExplosionPoint) {
    showExplosion(ship.readState().position, shipExplosionPoint);
  } else {
    ship.update(deltaTime);
    collisions.update();
  }

  lastFrameTime = now;
  requestAnimationFrame(() => update());
}

document.getElementById("hud")!.innerHTML = hud.render();
document.getElementById("canvas")!.innerHTML = `
  ${landingPad.render()}
  ${ground.render()}
  ${ship.render()}
  ${mountExplosion({ id: "ship-explosion" })}
`;

update();
hud.scheduleUpdates();
