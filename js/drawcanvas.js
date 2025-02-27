const canvas = document.getElementById("drawingCanvas");
const textWidth = document.getElementById("widthText");
const colorPicker = document.getElementById("drawColor");
const widthPicker = document.getElementById("widthRange");

canvas.width = 500;
canvas.height = 500;
const context = canvas.getContext("2d");
let drawing = false;
let color = colorPicker.value;
let width = 5;
widthText.textContent = width;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
  widthText.textContent = width;
});

widthPicker.addEventListener("input", () => {
  widthText.textContent = width;
  width = widthPicker.value;
});

function startDrawing(event) {
  drawing = true;
  drawing(event);
}

function stopDrawing() {
  drawing = false;
  context.beginPath();
}

function draw(event) {
  if (!drawing) return;
  context.lineWidth = width;
  context.lineCap = "round";
  context.strokeStyle = color;

  context.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  context.stroke();
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}

document.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    color = "red";
  } else if (event.key === "b") {
    color = "blue";
  } else if (event.key === "g") {
    color = "green";
  } else if (event.key === "e") {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
});
