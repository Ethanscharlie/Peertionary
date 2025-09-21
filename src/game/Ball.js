class Ball {
  constructor(canvas) {
    this.RADIUS = 15;
    this.DRAG = 0.1;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.x = 0;
    this.y = 0;

    this.velocity = { x: 0, y: 0 };
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  updatePhysics() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x = this.applyDragToNumber(this.velocity.x);
    this.velocity.y = this.applyDragToNumber(this.velocity.y);
  }

  isMoving() {
    return this.velocity.x != 0 && this.velocity.y != 0;
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

  draw() {
    ctx.fillStyle = "navy";
    ctx.fillRect(
      this.x - this.RADIUS,
      this.y - this.RADIUS,
      this.RADIUS * 2,
      this.RADIUS * 2,
    );
  }
}
