import { Player } from "./Player.js";
import { GameState } from "./GameState.js";
import { Box } from "./Box.js";
import { Point } from "./Point.js";
import { ServerNetworker } from "./ServerNetworker.js";

class Server {
  constructor() {
    this.gameState = new GameState();
    this.networker = new ServerNetworker()
      .setOnNewPlayerConnection((id) => {
        this.gameState.addNewPlayer(id);
      })
      .setOnReceiveMoveData((id, data) => {
        console.log(data);

        var isAnythingMoving = this.isAnythingMoving();
        this.gameState.isAnythingMoving = isAnythingMoving;

        if (this.itIsThisPlayersTurn(id) && !isAnythingMoving) {
          var player = this.gameState.getCurrentPlayer();
          player.velocityX = data.moveX;
          player.velocityY = data.moveY;
          this.gameState.nextTurn();
        }
      });
  }

  then(func) {
    this.networker.setOnServerOpen(func);
    return this;
  }

  itIsThisPlayersTurn(id) {
    return this.gameState.getCurrentPlayer().id == id;
  }

  gameLoop() {
    this.updatePhysics();
    this.networker.sendMessageToEveryone(this.gameState);
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

export { Server, GameState, Point, Box };
