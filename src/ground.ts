import { Vector2 } from "./math";
import { svgPoints, toAttributesString } from "./ui";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

export function createGround() {
  const paddingX = 25;
  const x0 = -paddingX;
  const maxHeight = 400;

  const v0 = new Vector2(x0, CANVAS_HEIGHT - maxHeight);

  let terrain = generate2dMountains({
    width: CANVAS_WIDTH + 2 * paddingX,
    maxHeight: 400,
    resolution: 20,
  });
  terrain = terrain.map((u) => u.add(v0));

  return {
    render() {
      return `
        <polyline
          id="terrain"
          points="${svgPoints(terrain)}"
          fill="none"
          stroke="var(--slate-500)"
          stroke-width="2"
          stroke-opacity="1"
        />
      `;
    },
  };
}

function generate2dMountains({
  width,
  maxHeight,
  resolution,
}: {
  width: number;
  maxHeight: number;
  /** distance between points in x axis */
  resolution: number;
}): Vector2[] {
  const res: Vector2[] = [];

  // generate rough points
  for (let x = 0; x < width; x += resolution) {
    const y = Math.random() * maxHeight;

    res.push(new Vector2(x, y));
  }

  // smooth
  for (let i = 0; i < res.length; i++) {
    const neighborhood = [
      res[i - 2],
      res[i - 1],
      res[i],
      res[i + 1],
      res[i + 2],
    ].filter(Boolean);

    const avgY =
      neighborhood.reduce((acc, cur) => acc + cur.y, 0) / neighborhood.length;

    res[i].y = avgY;
  }

  return res;
}
