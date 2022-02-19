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
  const position = new Vector2(500, 500);
  const velocity = Vector2.zero();
  const acceleration = Vector2.zero();
  const thrust: number = 0.0001;
  const rotationThrust: number = 90 * 0.5 * meterConversion;
  const safeVelocity: number = 0.001; //safe velocity for no kaboom on collision
  //rotation variables
  let rotationAngle = 0; //angle measured clockwise from upwards direction in degrees;
  const rotationMath = () => ({
    horizontal: Math.sin(rotationAngle * Math.PI/180), // * Math.PI/180  == degrees to radians conversion
    vertical: Math.cos(rotationAngle * Math.PI/180),
  });
  let rotationAcceleration = 0;
  let rotationVelocity = 0;

  return {
    render() {
      return `
        <g id="spaceship">
          <text transform="rotate(-45)">🚀</text>
        </g>
      `;
    },
    update(deltaTime: number, keyboard: KeyboardControls) {
      console.log("rotationAngle.value", rotationAngle);

      // react to controls
      acceleration.x = 0;
      acceleration.y = 0;
      rotationAcceleration = 0;

      if (keyboard.isPressed("ArrowUp")) {
        // TODO: Multiply vector by front facing vector
        // what does it mean^
        // Check this.
        const { vertical, horizontal } = rotationMath();

        acceleration.y = -thrust * vertical;  //because y axis is downwards
        acceleration.x = thrust * horizontal;
      }
      if (keyboard.isPressed("ArrowRight"))
        rotationAcceleration = rotationThrust;
      else if (keyboard.isPressed("ArrowLeft"))
        rotationAcceleration = -rotationThrust;

      // update physics
      //update rotational physics
      rotationVelocity += deltaTime * rotationAcceleration;
      rotationAngle += deltaTime * rotationVelocity;

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
        `translate(${position.x}, ${position.y}) rotate(${rotationAngle})`
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
