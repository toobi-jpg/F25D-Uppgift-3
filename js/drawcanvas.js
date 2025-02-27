const canvas = document.getElementById("drawingCanvas");
const textWidth = document.getElementById("widthText");
const colorPicker = document.getElementById("drawColor");
const widthPicker = document.getElementById("widthRange");

const context = canvas.getContext("2d");
let drawing = false;
let color = colorPicker.value;
let width = 5;
widthText.textContent = width;

function resizeCanvas() {
  const computedStyle = getComputedStyle(canvas);
  const width = parseInt(computedStyle.width);
  const height = parseInt(computedStyle.height);

  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
});

widthPicker.addEventListener("input", () => {
  widthText.textContent = width;
  width = widthPicker.value;
});

function startDrawing(event) {
  drawing = true;
  draw(event);
}

function stopDrawing() {
  drawing = false;
  context.beginPath();
}

function draw(event) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect(); // Get canvas position
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  context.lineWidth = width;
  context.lineCap = "round";
  context.strokeStyle = color;

  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
}

const resetCanvas = document.getElementById("resetCanvas");
resetCanvas.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
});

const saveImage = document.getElementById("saveImage");
saveImage.addEventListener("click", () => {
  let imgUrl = canvas.toDataURL("image/png");
  let downloadTag = document.createElement("a");
  downloadTag.href = imgUrl;
  downloadTag.download = "canvas-drawing.png";
  document.body.appendChild(downloadTag);
  downloadTag.click();
  document.body.removeChild(downloadTag);
});
