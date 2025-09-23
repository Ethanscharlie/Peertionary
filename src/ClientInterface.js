import { Server } from "./Server.js";

class ClientInterface {
  constructor(canvas) {
    this.colors = ["white", "white", "white", "white", "white"];

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.dragStartPos = { x: 0, y: 0 };
    this.move = { x: 0, y: 0 };
    this.aiming = false;

    this.sendMovement = (x, y) => {};

    // window.requestAnimationFrame(gameLoop);

    this.canvas.addEventListener("mousedown", (event) => {
      this.dragStartPos = this.getMousePos(event);
      this.aiming = true;
    });

    this.canvas.addEventListener("mousemove", (event) => {
      if (!this.aiming) return;
      var mousePos = this.getMousePos(event);
      this.move.x = this.clamp(
        (this.dragStartPos.x - mousePos.x) / 20,
        -10,
        10,
      );
      this.move.y = this.clamp(
        (this.dragStartPos.y - mousePos.y) / 20,
        -10,
        10,
      );
    });

    this.canvas.addEventListener("mouseup", (event) => {
      this.sendMovement(this.move.x, this.move.y);
      this.aiming = false;
    });
  }

  setSendMovement(func) {
    this.sendMovement = func;
    return this;
  }

  clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  render(gameState, myID) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.renderFloors(gameState);

    var i = 0;
    gameState.players.forEach((player) => {
      if (player.id == myID) {
        if (this.aiming) {
          this.ctx.beginPath();
          this.ctx.moveTo(player.x, player.y);
          this.ctx.lineTo(
            player.x + this.move.x * 20,
            player.y + this.move.y * 20,
          );
          this.ctx.stroke();
        }
      }

      this.drawBall(player, this.colors[i]);

      i++;
    });

    this.renderBoxs(gameState);
  }

  renderBoxs(gameState) {
    gameState.boxs.forEach((box) => {
      this.renderBox(box, "darkgreen");
    });
  }

  renderFloors(gameState) {
    gameState.floors.forEach((floor) => {
      this.renderBox(floor, "grey");
    });
  }

  renderBox(box, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(box.x, box.y, box.w, box.h);
  }

  renderBackground() {
    this.ctx.fillStyle = "skyblue";
    this.ctx.fillRect(0, 0, 800, 800);
  }

  drawBall(player, color) {
    var RADIUS = 8;

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, RADIUS, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }

  getMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x:
        ((evt.clientX - rect.left) / (rect.right - rect.left)) *
        this.canvas.width,
      y:
        ((evt.clientY - rect.top) / (rect.bottom - rect.top)) *
        this.canvas.height,
    };
  }
}

export { ClientInterface };
