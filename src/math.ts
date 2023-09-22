export class Vector2 {
  constructor(public x: number, public y: number) {}

  static zero() {
    return new Vector2(0, 0);
  }

  add(u: Readonly<Vector2>): Vector2 {
    return new Vector2(this.x + u.x, this.y + u.y);
  }

  subtract(u: Readonly<Vector2>): Vector2 {
    return new Vector2(this.x - u.x, this.y - u.y);
  }

  divideScalar(k: number): Vector2 {
    return new Vector2(this.x / k, this.y / k);
  }

  multiplyScalar(k: number): Vector2 {
    return new Vector2(this.x * k, this.y * k);
  }

  sqrMagnitude() {
    return this.x * this.x + this.y * this.y;
  }

  rotateByAngle(angle: number) {
    const horizontal = Math.sin((angle * Math.PI) / 180);
    const vertical = Math.cos((angle * Math.PI) / 180);

    return new Vector2(
      this.x * Math.cos((angle * Math.PI) / 180) -
        this.y * Math.sin((angle * Math.PI) / 180),
      this.x * Math.sin((angle * Math.PI) / 180) +
        this.y * Math.cos((angle * Math.PI) / 180)
    );
  }
}

export function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function interpolateLinearly(
  pointA: Vector2,
  pointB: Vector2,
  x0: number
) {
  const a = (pointB.y - pointA.y) / (pointB.x - pointA.x);
  const b = pointA.y - a * pointA.x;
  return a * x0 + b;
}

export function findLinesIntersection(
  pointA: Vector2,
  pointB: Vector2,
  pointC: Vector2,
  pointD: Vector2,
  infiniteLines: boolean = false
) {
  // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
  const x1 = pointA.x;
  const y1 = pointA.y;
  const x2 = pointB.x;
  const y2 = pointB.y;

  const x3 = pointC.x;
  const y3 = pointC.y;
  const x4 = pointD.x;
  const y4 = pointD.y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator === 0) return null;

  if (infiniteLines)
    return new Vector2(
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
        denominator,
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
        denominator
    );

  // Bezier parameters
  const tNumerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
  const t = tNumerator / denominator;
  if (t < 0 || t > 1) return null;

  const uNumerator = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);
  const u = uNumerator / denominator;
  if (u < 0 || u > 1) return null;

  return new Vector2(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
}
