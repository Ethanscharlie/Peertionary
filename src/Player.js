class Player {
  constructor(id) {
    this.RADIUS = 15;
    this.DRAG = 0.99;

    this.id = id;
    this.x = 40;
    this.y = 40;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  updatePhysics(gameState) {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.velocityX = this.applyDragToNumber(this.velocityX);
    this.velocityY = this.applyDragToNumber(this.velocityY);

    if (this.x < 0 || this.x > 800) {
      this.velocityX *= -1;
    }

    if (this.y < 0 || this.y > 800) {
      this.velocityY *= -1;
    }

    gameState.level.walls.forEach((box) => {
      // Check for horizontal collision (left or right)
      if (this.y >= box.y && this.y <= box.y + box.h) {
        // Moving left (point.x - velocityX <= box.x) – collision with the left side of the box
        if (this.x - this.velocityX <= box.x && this.x > box.x) {
          this.velocityX = -this.velocityX; // Reflect velocity in X direction
          this.x = box.x - 1; // Move point just outside the box on the left
        }
        // Moving right (point.x - velocityX >= box.x + box.w) – collision with the right side of the box
        else if (
          this.x - this.velocityX >= box.x + box.w &&
          this.x < box.x + box.w
        ) {
          this.velocityX = -this.velocityX; // Reflect velocity in X direction
          this.x = box.x + box.w + 1; // Move point just outside the box on the right
        }
      }

      // Check for vertical collision (top or bottom)
      if (this.x >= box.x && this.x <= box.x + box.w) {
        // Moving up (point.y - velocityY <= box.y) – collision with the bottom side of the box
        if (this.y - this.velocityY <= box.y && this.y > box.y) {
          this.velocityY = -this.velocityY; // Reflect velocity in Y direction
          this.y = box.y - 1; // Move point just outside the box on the bottom
        }
        // Moving down (point.y - velocityY >= box.y + box.h) – collision with the top side of the box
        else if (
          this.y - this.velocityY >= box.y + box.h &&
          this.y < box.y + box.h
        ) {
          this.velocityY = -this.velocityY; // Reflect velocity in Y direction
          this.y = box.y + box.h + 1; // Move point just outside the box on the top
        }
      }
    });
  }

  isMoving() {
    return this.velocityX != 0 || this.velocityY != 0;
  }

  applyDragToNumber(number) {
    if (Math.abs(number) < 0.1) {
      return 0;
    }
    return number * this.DRAG;
  }
}

export { Player };
