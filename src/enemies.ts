import { Vector2 } from "./math";
import { createTrail } from "./ship/trail";
import { svgPoints } from "./ui";

const enemyWidth = 6;
const enemyHeight = 12;
const maxThrust = 0.00002;

const enemyShape = [
  new Vector2(-enemyWidth / 2, enemyHeight / 2),
  new Vector2(0, -enemyHeight / 2),
  new Vector2(enemyWidth / 2, enemyHeight / 2),
];

export function createEnemies(playerShip: {
  readState: () => { position: Vector2 };
}) {
  const count = 3;

  const enemies = Array.from({ length: count }).map((_, i) => ({
    state: createEnemyState(new Vector2(Math.random() * 800 + 50 + i * 50, 10)),
    trail: createTrail(`enemy-trail-${i}`, {
      stroke: "var(--red)",
      strokeOpacity: 0.2,
      strokeWidth: 2,
      strokeDasharray: "4 4 4",
    }),
  }));

  return {
    render() {
      return `
        <g id="enemies">
          ${enemies
            .map((enemy, i) => {
              return `
                <g id="enemy-${i}">
                  <polygon
                    points="${svgPoints(enemyShape)}"
                    fill="var(--slate-black)"
                    stroke="var(--red)"
                    stroke-width="1"
                    stroke-opacity="0.8"
                  />
                  </g>
                ${enemy.trail.render()}
            `;
            })
            .join("\n")}
        </g>
        `;
    },
    update(deltaTime: number) {
      const { position: playerPosition } = playerShip.readState();

      enemies.forEach((enemy, i) => {
        const state = enemy.state;

        // Rotation
        {
          const towardsPlayer = playerPosition.subtract(state.position);
          const angleTowardsPlayer =
            ((360 +
              (180 * Math.atan2(towardsPlayer.y, towardsPlayer.x)) / Math.PI) %
              360) +
            90;

          state.rotationAngle =
            (state.rotationAngle + angleTowardsPlayer * 2) / 3;
        }

        // thrust
        {
          const deltaThrust = maxThrust * 0.002;
          state.thrust = Math.min(
            maxThrust,
            state.thrust + deltaTime * deltaThrust
          );
        }

        // acceleration
        {
          const horizontal = Math.sin((state.rotationAngle * Math.PI) / 180);
          const vertical = Math.cos((state.rotationAngle * Math.PI) / 180);

          state.acceleration.y = -state.thrust * vertical; // - because y axis is downwards
          state.acceleration.x = state.thrust * horizontal;
        }

        state.velocity = state.velocity.add(
          state.acceleration.multiplyScalar(deltaTime)
        );
        state.position = state.position.add(
          state.velocity.multiplyScalar(deltaTime)
        );

        enemy.trail.update(enemy.state);
      });

      // Update UI
      for (let i = 0; i < count; ++i) {
        const enemy = enemies[i];
        const enemyElement = document.getElementById(`enemy-${i}`)!;

        enemyElement.setAttribute(
          "transform",
          `translate(${enemy.state.position.x}, ${enemy.state.position.y}) rotate(${enemy.state.rotationAngle})`
        );
      }
    },
  };
}

interface EnemyState {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  rotationAngle: number;
  thrust: number;
}

function createEnemyState(position: Vector2): EnemyState {
  return {
    position: position,
    velocity: new Vector2(0, 0),
    acceleration: new Vector2(0, 0),
    rotationAngle: 0,
    thrust: 0,
  };
}
