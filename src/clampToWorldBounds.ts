import { clamp, Vector2 } from "./math";
import { worldBounds } from "./ship";

export function clampToWorldBounds(
  position: Vector2,
  velocity: Vector2,
  shipWidth: number
): void {
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
