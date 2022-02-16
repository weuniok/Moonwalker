import { KeyboardControls } from "./keyboardControls";
import { clamp, Vector2 } from "./math";

// const GRAVITY = 9.81 / 500_000;
const meterConversion = 1 / 500_000;
// const gravity = 9.81 * meterConversion;
const gravity = 0;

const worldBounds = {
  top: 0,
  right: 1000,
  down: 1000,
  left: 0,
};

export function createShip() {
  const position: Vector2 = { x: 500, y: 500 };
  const velocity: Vector2 = { x: 0, y: 0 };
  const acceleration: Vector2 = { x: 0, y: 0 };
  const thrust: number = 0.0001;
  const rotationThrust: number = 0.0001;
  const safeVelocity: number = 0.001; //safe velocity for no kaboom on collision
  // const rotationAngle:; number = 0; //angle measured clockwise from upwards direction in radians;
  // const rotationTrig: Vector2 = {horizontal: Math.sin(rotationAngle), vertical: Math.cos(rotationAngle)};
  // const rotationAcceleration: number = placeholder;
  // const rotationVelocity: number = placeholder;
  return {
    html() {
      return `
        <g id="spaceship">
          <text>🚀</text>
        </g>
      `;
    },
    update(deltaTime: number, keyboard: KeyboardControls) {
      // react to controls
      //TODO add rotation
      acceleration.x = 0;
      acceleration.y = 0;

      if (keyboard.isPressed("ArrowUp")) acceleration.y = -thrust;
      else if (keyboard.isPressed("ArrowDown")) acceleration.y = thrust;

      if (keyboard.isPressed("ArrowRight")) acceleration.x = thrust;
      else if (keyboard.isPressed("ArrowLeft")) acceleration.x = -thrust;

      //AFTER ROTATION
      /*
      if (keyboard.isPressed("ArrowUp")) acceleration.y = -thrust;
      else if (keyboard.isPressed("ArrowDown")) acceleration.y = thrust;

      if (keyboard.isPressed("ArrowRight")) rotationAcceleration.x = thrust;
      else if (keyboard.isPressed("ArrowLeft")) acceleration.x = -thrust;
        */
      //

      // update physics
      //update rotational physics
      //rotationVelocity = deltaTime*rotationAcceleration;
      //rotationAngle = deltaTime*rotationVelocity

      acceleration.y = gravity + acceleration.y;

      //update linear physics
      velocity.x += deltaTime * acceleration.x;
      velocity.y += deltaTime * acceleration.y;
      position.x += deltaTime * velocity.x;
      position.y += deltaTime * velocity.y;

      clampToWorldBounds(position, velocity);

      // update UI
      const element = document.getElementById(
        "spaceship"
      )! as any as SVGGElement;
      element.setAttribute(
        "transform",
        `translate(${position.x}, ${position.y}) rotate(-45)`
      );
    },
  };
}
function clampToWorldBounds(position: Vector2, velocity: Vector2) {
  const newPosX = clamp(
    worldBounds.left + 20,
    position.x,
    worldBounds.right - 20
  );
  const newPosY = clamp(
    worldBounds.top + 30,
    position.y,
    worldBounds.down - 10
  );

  if (newPosX !== position.x) {
    position.x = newPosX;
    velocity.x = 0;
  }
  if (newPosY !== position.y) {
    position.y = newPosY;
    velocity.y = 0;
  }
}
