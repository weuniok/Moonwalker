import { createHud } from "./hud";
import "./index.css";

type Vector2 = { x: number; y: number };

function createShip() {
  const position: Vector2 = { x: 0, y: 0 };

  window.addEventListener("keydown", (event) => {
    console.log(event.key, event.keyCode, position);
    // TODO (Pablo): Jeśli użytkownik wciska strzałkę w górę
    // Dodaj 1 do position.y.
    if (event.key === "ArrowUp") {
      position.y += 1;
    }

    const div = document.getElementById("spaceship")!;
    div.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
  });

  return {
    html() {
      return `<div id="spaceship">🚀</div>`;
    },
  };
}

const hud = createHud();
const ship = createShip();

let lastFrameTime = Date.now();

function update() {
  const now = Date.now();
  const deltaTime = now - lastFrameTime;

  hud.calculateFps(deltaTime);

  lastFrameTime = now;
  requestAnimationFrame(() => update());
}

document.getElementById("app")!.innerHTML = `
  ${hud.html()}
  ${ship.html()}
`;

update();
hud.scheduleUpdates();
