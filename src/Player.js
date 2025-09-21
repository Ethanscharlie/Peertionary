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

    gameState.walls.forEach((wall) => {
      // Check for horizontal collision (left or right)
      if (this.y >= wall.y && this.y <= wall.y + wall.h) {
        // Moving left (point.x - velocityX <= wall.x) – collision with the left side of the wall
        if (this.x - this.velocityX <= wall.x && this.x > wall.x) {
          this.velocityX = -this.velocityX; // Reflect velocity in X direction
          this.x = wall.x - 1; // Move point just outside the wall on the left
        }
        // Moving right (point.x - velocityX >= wall.x + wall.w) – collision with the right side of the wall
        else if (
          this.x - this.velocityX >= wall.x + wall.w &&
          this.x < wall.x + wall.w
        ) {
          this.velocityX = -this.velocityX; // Reflect velocity in X direction
          this.x = wall.x + wall.w + 1; // Move point just outside the wall on the right
        }
      }

      // Check for vertical collision (top or bottom)
      if (this.x >= wall.x && this.x <= wall.x + wall.w) {
        // Moving up (point.y - velocityY <= wall.y) – collision with the bottom side of the wall
        if (this.y - this.velocityY <= wall.y && this.y > wall.y) {
          this.velocityY = -this.velocityY; // Reflect velocity in Y direction
          this.y = wall.y - 1; // Move point just outside the wall on the bottom
        }
        // Moving down (point.y - velocityY >= wall.y + wall.h) – collision with the top side of the wall
        else if (
          this.y - this.velocityY >= wall.y + wall.h &&
          this.y < wall.y + wall.h
        ) {
          this.velocityY = -this.velocityY; // Reflect velocity in Y direction
          this.y = wall.y + wall.h + 1; // Move point just outside the wall on the top
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
