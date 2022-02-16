export class Vector2 {
  constructor(public x: number, public y: number) {}
}

export function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
