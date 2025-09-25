import { Point } from "./Point.js";
import { Box } from "./Box.js";

class Level {
  constructor() {
    this.spawn = new Point(0, 0);
    this.hole = new Point(0, 0);
    this.walls = [];
  }

  setSpawn(point) {
    this.spawn = point;
    return this;
  }

  setHole(point) {
    this.hole = point;
    return this;
  }

  addWall(box) {
    this.walls.push(box);
    return this;
  }
}

export { Level };
