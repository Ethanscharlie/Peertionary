import { Wall } from "./Wall.js";
import { Point } from "./Point.js";

class GameState {
  constructor() {
    this.players = [];
    this.walls = [];
    this.floors = [];
    this.spawn = new Point(0, 0);
    this.turn = 0;
    this.isAnythingMoving = false;

    // this.loadWallsFromFile();
  }

  getCurrentPlayer() {
    return this.players[this.turn];
  }

  nextTurn() {
    this.turn++;
    if (this.turn >= this.players.length) {
      this.turn = 0;
    }
  }

  loadWallsFromFile() {
    fetch("./golf.ldtk")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var spawnEntity =
          data["levels"][0]["layerInstances"][0]["entityInstances"][0];
        this.spawn.x = spawnEntity.px[0];
        this.spawn.y = spawnEntity.px[1];

        var tiles = data["levels"][0]["layerInstances"][1]["autoLayerTiles"];
        tiles.forEach((tile) => {
          this.walls.push(new Wall(tile["px"][0], tile["px"][1], 16, 16));
        });

        var tiles = data["levels"][0]["layerInstances"][2]["autoLayerTiles"];
        tiles.forEach((tile) => {
          this.floors.push(new Wall(tile["px"][0], tile["px"][1], 16, 16));
        });
      });
  }
}

export { GameState };
