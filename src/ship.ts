import { KeyboardControls } from "./keyboardControls";
import { Vector2 } from "./math";

// Ship stats
const MAX_ACCELERATION = 1;

export function createShip() {
  const position: Vector2 = { x: 0, y: 0 };
  const velocity: Vector2 = { x: 0, y: 0 };
  const acceleration: Vector2 = { x: 0, y: 0 };
  const thrust: number = 0.0001;

  return {
    html() {
      return `<div id="spaceship">🚀</div>`;
    },
    update(deltaTime: number, keyboard: KeyboardControls) {
      // react to controls

      if (keyboard.isPressed("ArrowUp")) acceleration.y = -thrust;
      else if (keyboard.isPressed("ArrowDown")) acceleration.y = thrust;
      else acceleration.y = 0;

      if (keyboard.isPressed("ArrowRight")) acceleration.x = thrust;
      else if (keyboard.isPressed("ArrowLeft")) acceleration.x = -thrust;
      else acceleration.x = 0;

      // update physics

      velocity.x += deltaTime * acceleration.x;
      velocity.y += deltaTime * acceleration.y;
      position.x += deltaTime * velocity.x;
      position.y += deltaTime * velocity.y;

      // update UI

      const div = document.getElementById("spaceship")!;
      div.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    },
  };
}
