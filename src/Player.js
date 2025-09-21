class Player {
  constructor(id) {
    this.RADIUS = 15;
    this.DRAG = 0.01;

    this.id = id;
    this.x = 40;
    this.y = 40;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  updatePhysics() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.velocityX = this.applyDragToNumber(this.velocityX);
    this.velocityY = this.applyDragToNumber(this.velocityY);

    if (this.isOffScreen()) {
      this.velocityX *= -1;
      this.velocityY *= -1;
    }
  }

  isOffScreen() {
    return this.x < 0 || this.x > 800 || this.y < 0 || this.y > 800;
  }

  isMoving() {
    return this.velocityX != 0 || this.velocityY != 0;
  }

  applyDragToNumber(number) {
    if (number > this.DRAG) {
      number -= this.DRAG;
      return number;
    }

    if (number < -this.DRAG) {
      number += this.DRAG;
      return number;
    }

    return 0;
  }
}
