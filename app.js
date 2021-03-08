const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let painting = false;
let colors = document.getElementsByClassName("color");
let sizeChangeBtn = document.getElementById("sizeChangeBtn");
let brushSize = document.getElementsByClassName("brushSize").item(0);
let colorPicker = document.getElementById("colorPicker");
let addColorBtn = document.getElementById("addColorBtn");
let saveImageBtn = document.getElementById("saveImageBtn");

context.strokeStyle = "#000000";

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting) {
    context.lineTo(x, y);
    context.stroke();
  } else {
    context.beginPath();
    context.moveTo(x, y);
  }
}

function onColorSelect(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  colorPicker.value = convertRgbToHex(color);
}

function convertRgbToHex(rgbValue) {
  let hexValue = "#";
  rgbValue = rgbValue.replace(/[^%,\d]/g, "");
  rgbValue = rgbValue.split(",");
  for (i = 0; i < rgbValue.length; i++) {
    let num1 = parseInt(rgbValue[i] / 16);
    let num2 = rgbValue[i] % 16;

    if (num1 > 9) {
      num1 = "a".charCodeAt(0) + (num1 % 9) - 1;
      hexValue += String.fromCharCode(num1);
    } else {
      hexValue += num1;
    }
    if (num2 > 9) {
      num2 = "a".charCodeAt(0) + (num2 % 9) - 1;
      hexValue += String.fromCharCode(num2);
    } else {
      hexValue += num2;
    }
  }

  return hexValue;
}

function onCanSizeChange(event) {
  const canWidth = document.getElementById("canWidth");
  const canHeight = document.getElementById("canHeight");

  if (Number.parseInt(canWidth.value) > Number.parseInt(canWidth.max)) {
    canWidth.value = canWidth.max;
  }
  if (Number.parseInt(canHeight.value) > Number.parseInt(canHeight.max)) {
    canHeight.value = canHeight.max;
  }

  canvas.style.width = canWidth.value + "px";
  canvas.style.height = canHeight.value + "px";
  canvas.width = canWidth.value;
  canvas.height = canHeight.value;
}

function onBrushSizeChange(event) {
  let size = event.target.value;
  context.lineWidth = size;
}

function onColorChange(event) {
  context.strokeStyle = event.target.value;
}

function addColor() {
  let newColor = colorPicker.value;

  for (let i = 0; i < colors.length; i++) {
    let addedColor = colors[i].style.backgroundColor;
    addedColor = convertRgbToHex(addedColor);
    if (newColor === addedColor) {
      return;
    }
  }
  let newColorDiv = document.createElement("div");
  newColorDiv.classList.add("color");
  newColorDiv.style.backgroundColor = newColor;
  newColorDiv.addEventListener("mousedown", onColorSelect);
  document.getElementById("colors").appendChild(newColorDiv);
}

function saveImage() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "fromPainter";
  link.click();
}

function preventRightClick(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", preventRightClick);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("mousedown", onColorSelect)
  );
}

if (sizeChangeBtn) {
  sizeChangeBtn.addEventListener("click", onCanSizeChange);
}

if (brushSize) {
  brushSize.addEventListener("change", onBrushSizeChange);
}

if (colorPicker) {
  colorPicker.addEventListener("change", onColorChange);
}

if (addColorBtn) {
  addColorBtn.addEventListener("click", addColor);
}

if (saveImageBtn) {
  saveImageBtn.addEventListener("click", saveImage);
}
