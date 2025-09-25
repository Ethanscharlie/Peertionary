import { Box } from "./Box.js";
import { Point } from "./Point.js";
import { Level } from "./Level.js";

class GameState {
  constructor() {
    this.players = [];
    this.turn = 0;
    this.isAnythingMoving = false;

    // this.loadBoxsFromFile();

    this.level = new Level()
      .setSpawn(new Point(0, 0))
      .setHole(new Point(0, 0))
      .addWall(new Box(10, 10, 100, 100));
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

  loadBoxsFromFile() {
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
          this.boxs.push(new Box(tile["px"][0], tile["px"][1], 16, 16));
        });

        var tiles = data["levels"][0]["layerInstances"][2]["autoLayerTiles"];
        tiles.forEach((tile) => {
          this.floors.push(new Box(tile["px"][0], tile["px"][1], 16, 16));
        });
      });
  }
}

export { GameState };
