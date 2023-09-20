import { Vector2, interpolateLinearly, findLinesIntersection } from "./math";

export function createCollisions(
  ship: {
    getVertices: () => Vector2[];
  },
  ground: {
    readState: () => { terrain: Vector2[] };
  },
  {
    onCollision,
  }: {
    onCollision: (collidedVertex: Vector2) => void;
  }
) {
  function update() {
    const shipVertices: Vector2[] = ship.getVertices();
    const groundVertices: Vector2[] = ground.readState().terrain;

    let shipLeft = Infinity;
    let shipRight = -Infinity;

    for (const v of shipVertices) {
      shipLeft = Math.min(v.x, shipLeft);
      shipRight = Math.max(v.x, shipRight);
    }

    const groundNearShip = groundVertices.filter(
      (v) => v.x >= shipLeft && v.x <= shipRight
    );

    // Ship vertex inside ground
    const collisionVertex =
      shipVertices.find((shipVertex) => {
        const nextTerrainIndex = groundVertices.findIndex(
          (terrainVertex) => terrainVertex.x > shipVertex.x
        );

        return (
          shipVertex.y >
          interpolateLinearly(
            groundVertices[nextTerrainIndex - 1],
            groundVertices[nextTerrainIndex],
            shipVertex.x
          )
        );
      }) ||
      // Ground vertex inside ship (impaled)
      groundNearShip.find((groundVertex) => {
        // https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
        let intersectionCount = 0;
        shipVertices.forEach((shipVertex, vertexIndex) => {
          const nextVertex =
            shipVertices.length === vertexIndex + 1
              ? shipVertices[0]
              : shipVertices[vertexIndex + 1];

          const intersection = findLinesIntersection(
            shipVertex,
            nextVertex,
            groundVertex,
            new Vector2(0, 0)
          );
          if (intersection) intersectionCount += 1;
        });

        if (intersectionCount % 2) return true;
      });

    if (collisionVertex) onCollision(collisionVertex);
  }

  return { update };
}
