const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ball = new Ball(canvas).setPosition(100, 100);
render();

let dragStartPos = { x: 0, y: 0 };

canvas.addEventListener("mousedown", function (event) {
  dragStartPos = getMousePos();
});

canvas.addEventListener("mousemove", function (event) {
  render();
});

canvas.addEventListener("mouseup", function (event) {});

function render() {
  ball.draw();
}

canvas.addEventListener("mousemove", getMousePos);
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
