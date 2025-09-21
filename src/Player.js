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

  updatePhysics() {
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
