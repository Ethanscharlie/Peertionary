import { Player } from "./Player.js";
import { GameState } from "./GameState.js";
import { Wall } from "./Wall.js";
import { Point } from "./Point.js";

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

export { Server, GameState, Point, Wall };
