type Key = "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft";

export function keyboardControls() {
  const keys = new Set<string>();

  const keyDown = (event: KeyboardEvent) => {
    keys.add(event.key);
  };

  const keyUp = (event: KeyboardEvent) => {
    keys.delete(event.key);
  };

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  return {
    isPressed(key: Key) {
      return keys.has(key);
    },
  };
}

export interface KeyboardControls extends ReturnType<typeof keyboardControls> {}
