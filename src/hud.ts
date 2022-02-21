import { formatNumber } from "./formatNumber";
import { Vector2 } from "./math";

export function createHud({
  getShipStats,
}: {
  getShipStats: () => Record<string, Vector2 | number>;
}) {
  let fps = 60;

  return {
    calculateFps(deltaTime: number) {
      fps = 1000 / deltaTime;
    },
    scheduleUpdates() {
      const updateHud = () => {
        const fpsCounter =
          document.querySelector<HTMLOutputElement>("#fps-counter");
        const shipStatsList =
          document.querySelector<HTMLOutputElement>("#ship-stats");

        if (fpsCounter) {
          fpsCounter.innerText = `${Math.round(fps)} FPS`;
        }

        if (shipStatsList) {
          Object.entries(getShipStats()).forEach(([key, value], i) => {
            let div = shipStatsList.children.item(i);

            // We create `<div><dt></dt><dd></dd></div>` for each ship stat.
            if (!div) {
              div = document.createElement("div");
              div.appendChild(document.createElement("dt"));
              div.appendChild(document.createElement("dd"));

              shipStatsList.appendChild(div);
            }

            const dt = div.children[0] as HTMLElement;
            const dd = div.children[1] as HTMLElement;

            dt.innerText = key;
            dd.innerText =
              value instanceof Vector2
                ? `${formatNumber(value.x)}, ${formatNumber(value.y)}`
                : `${formatNumber(value)}`;
          });
        }
      };

      const interval = setInterval(updateHud, 2000);

      return {
        cleanup() {
          clearInterval(interval);
        },
      };
    },
    render() {
      return `\
        <output id="fps-counter">${fps} FPS</output>
        <dl id="ship-stats"></dl>
      `;
    },
  };
}
