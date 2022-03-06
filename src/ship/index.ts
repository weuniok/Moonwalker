import { KeyboardControls } from "../keyboardControls";
import { clamp, Vector2 } from "../math";
import { svgPoints } from "../ui";

import { maxThrust, shipHeight, shipWidth } from "./constant";
import { createExhaust } from "./exhaust";
import { createFlightPathPrediction } from "./flightPathPrediction";

const DEBUG = false;

const meterConversion = 1 / 500_000;
const gravity = 9.81 * meterConversion;
// const gravity = 0;

const worldBounds = {
  top: 0,
  right: 1000,
  down: 1000,
  left: 0,
};

const shipShape = [
  new Vector2(-shipWidth / 2, shipHeight / 2),
  new Vector2(0, -shipHeight / 2),
  new Vector2(shipWidth / 2, shipHeight / 2),
];

export function createShip(keyboard: KeyboardControls) {
  const position = new Vector2(500, 500);
  const velocity = Vector2.zero();
  const acceleration = Vector2.zero();

  let thrust = 0;

  const rotationThrust: number = 90 * 0.5 * meterConversion;
  const safeVelocity: number = 0.001; // safe velocity for no kaboom on collision

  let rotationAngle = 0; // angle measured clockwise from upwards direction in degrees;
  let rotationAcceleration = 0;
  let rotationVelocity = 0;

  const exhaust = createExhaust();
  const flightPathPrediction = createFlightPathPrediction();

  function readState() {
    return {
      position,
      velocity,
      acceleration,
      thrust,
      rotationAngle,
    } as const;
  }

  function updateUI() {
    const state = readState();

    exhaust.update(state);
    flightPathPrediction.update(state);
  }

  return {
    readState,
    render() {
      return `
        <g id="spaceship-ui">
          ${flightPathPrediction.render()}
          <g id="spaceship">
            ${renderDebugRect()}        
            <polygon
              points="${svgPoints(shipShape)}"
              fill="var(--slate-black)"
              stroke="var(--slate-400)"
              stroke-width="2"
            />
            ${exhaust.render()}
          </g>
        </g>
      `;
    },
    update(deltaTime: number) {
      // reset acceleration
      acceleration.x = 0;
      acceleration.y = 0;
      rotationAcceleration = 0;

      // loop rotationAngle when out of (-180, 180) bonds
      rotationAngle = rotationAngle % 360;
      if (rotationAngle > 180) rotationAngle = rotationAngle - 360;

      if (keyboard.isPressed("ArrowRight"))
        rotationAcceleration = rotationThrust;
      else if (keyboard.isPressed("ArrowLeft"))
        rotationAcceleration = -rotationThrust;

      if (keyboard.isPressed("ArrowUp")) {
        // makes thrust increase when button is held longer
        const deltaThrust = maxThrust * 0.002;
        thrust = Math.min(maxThrust, thrust + deltaTime * deltaThrust);
      } else {
        thrust = 0;
      }

      // react to controls
      if (thrust) {
        const horizontal = Math.sin((rotationAngle * Math.PI) / 180);
        const vertical = Math.cos((rotationAngle * Math.PI) / 180);

        acceleration.y = -thrust * vertical; // - because y axis is downwards
        acceleration.x = thrust * horizontal;
      }

      // update physics
      // update rotational physics
      rotationVelocity += deltaTime * rotationAcceleration;
      rotationAngle += 0.5 * deltaTime * rotationVelocity;

      acceleration.y = gravity + acceleration.y;

      // update linear physics
      velocity.x += deltaTime * acceleration.x;
      velocity.y += deltaTime * acceleration.y;
      position.x += 0.5 * deltaTime * velocity.x;
      position.y += 0.5 * deltaTime * velocity.y;

      clampToWorldBounds(position, velocity);

      updateUI();
    },
  };
}


function clampToWorldBounds(position: Vector2, velocity: Vector2): void {
  const newPosX = clamp(
    worldBounds.left + shipWidth / 2,
    position.x,
    worldBounds.right - shipWidth / 2
  );
  const newPosY = clamp(
    worldBounds.top + shipWidth / 2,
    position.y,
    worldBounds.down - shipWidth / 2
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

function renderDebugRect() {
  if (DEBUG) {
    return `
      <rect
        width="${shipWidth}"
        height="${shipHeight}"
        x="-${shipWidth / 2}"
        y="-${shipHeight / 2}"
        fill="none"
        stroke="var(--slate-800)"
        stroke-width="2"
      />
    `;
  }

  return "";
}
