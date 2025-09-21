class Player {
  constructor(id) {
    this.RADIUS = 15;
    this.DRAG = 0;

    this.id = id;
    this.x = 10;
    this.y = 300;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  updatePhysics() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.velocityX = this.applyDragToNumber(this.velocityX);
    this.velocityY = this.applyDragToNumber(this.velocityY);
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
