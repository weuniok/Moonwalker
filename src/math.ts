export class Vector2 {
  constructor(public x: number, public y: number) {}

  static zero() {
    return new Vector2(0, 0);
  }
}

export function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
