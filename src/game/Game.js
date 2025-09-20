const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ball = new Ball(canvas).setPosition(100, 100);

let dragStartPos = { x: 0, y: 0 };
let move = { x: 0, y: 0 };
let aiming = false;

render();

canvas.addEventListener("mousedown", function (event) {
  dragStartPos = getMousePos(event);
  aiming = true;
});

canvas.addEventListener("mousemove", function (event) {
  if (!aiming) return;
  var mousePos = getMousePos(event);
  move.x = (dragStartPos.x - mousePos.x) / 20;
  move.y = (dragStartPos.y - mousePos.y) / 20;
});

canvas.addEventListener("mouseup", function (event) {
  if (!ball.isMoving()) {
    ball.velocity.x = move.x;
    ball.velocity.y = move.y;
  }
  aiming = false;
});

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

window.requestAnimationFrame(gameLoop);
function gameLoop() {
    updatePhysics();
    render();
    window.requestAnimationFrame(gameLoop);
}

function updatePhysics() {
  ball.updatePhysics();
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();

  if (aiming) {
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(ball.x + move.x * 20, ball.y + move.y * 20);
    ctx.stroke();
  }
}
