class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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

class Server {
  constructor() {
    this.peer = new Peer();
    this.connections = [];
    this.id;
    this.gameState = new GameState();

    this.onServerOpen = (code) => {};

    this.peer.on("open", (id) => {
      this.id = id;
      console.log(id);

      console.log("Server Open");
      this.onServerOpen(id);
    });

    this.peer.on("connection", (conn) => {
      console.log("Got connection from " + conn.peer);
      this.connections.push(conn);

      var id = conn.peer;
      var player = new Player(id).setPosition(
        this.gameState.spawn.x,
        this.gameState.spawn.y,
      );

      this.gameState.players.push(player);

      conn.on("data", (data) => {
        console.log(data);

        var isAnythingMoving = this.isAnythingMoving();
        this.gameState.isAnythingMoving = isAnythingMoving;

        if (this.itIsThisPlayersTurn(conn.peer) && !isAnythingMoving) {
          var player = this.gameState.getCurrentPlayer();
          player.velocityX = data.moveX;
          player.velocityY = data.moveY;
          this.gameState.nextTurn();
        }

        this.updateForAllClients();
      });
    });
  }

  then(func) {
    this.onServerOpen = func;
    return this;
  }

  updateForAllClients() {
    this.connections.forEach((conn) => {
      conn.send(this.gameState);
    });
  }

  itIsThisPlayersTurn(id) {
    return this.gameState.getCurrentPlayer().id == id;
  }

  gameLoop() {
    this.updatePhysics();
    this.updateForAllClients();
  }

  isAnythingMoving() {
    var moving = false;

    this.gameState.players.forEach((player) => {
      if (player.isMoving()) {
        moving = true;
      }
    });

    return moving;
  }

  updatePhysics() {
    this.gameState.players.forEach((player) => {
      player.updatePhysics(this.gameState);
    });
  }
}
