class Ball {
  constructor(canvas) {
    this.RADIUS = 15;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
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

