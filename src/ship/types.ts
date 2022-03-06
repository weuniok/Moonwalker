import type { createShip } from "./index";

export type Ship = ReturnType<typeof createShip>;
export type ShipState = ReturnType<Ship["readState"]>;
