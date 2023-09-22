import { Vector2 } from "./math";

const WIDTH = 20;

export function createLandingPad(ground: { terrain: Vector2[] }) {
  const center = placeLandingPad(ground.terrain);

  return {
    render() {
      return `
        <rect
          id="landing-pad"
          x="${center.x - WIDTH / 2}"
          y="${center.y - WIDTH / 2}"
          width="${WIDTH}"
          height="${WIDTH}"
          rx="0.25"
          ry="0.25"
          stroke="var(--slate-50)"
          stroke-width="8"
          stroke-opacity="0.2"
          fill="var(--slate-50)"
          fill-opacity="0.8"
        />
      `;
    },
  };
}

function placeLandingPad(terrain: Vector2[]) {
  let minSlope = Infinity;
  let res: Vector2 | null = null;

  for (let i = 2; i < terrain.length - 2; i++) {
    const slope = Math.abs(terrain[i].y - terrain[i - 1].y);

    if (slope < minSlope) {
      minSlope = slope;
      res = terrain[i].add(terrain[i - 1]).divideScalar(2);
    }
  }

  return res || terrain[Math.floor(terrain.length / 2)];
}
