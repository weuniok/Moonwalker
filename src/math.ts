export class Vector2 {
  constructor(public x: number, public y: number) {}

  static zero() {
    return new Vector2(0, 0);
  }

  add(u: Vector2): Vector2 {
    return new Vector2(this.x + u.x, this.y + u.y);
  }

  subtract(u: Vector2): Vector2 {
    return new Vector2(this.x - u.x, this.y - u.y);
  }

  multiplyScalar(k: number): Vector2 {
    return new Vector2(this.x * k, this.y * k);
  }

  sqrMagnitude() {
    return this.x * this.x + this.y * this.y;
  }

  normalize(): Vector2 {
    const magnitude = Math.sqrt(this.sqrMagnitude());

    return new Vector2(this.x / magnitude, this.y / magnitude);
  }
}

export function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
