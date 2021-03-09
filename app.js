const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("color");
const sizeChangeBtn = document.getElementById("sizeChangeBtn");
const brushSize = document.getElementsByClassName("brushSize").item(0);
const colorPicker = document.getElementById("colorPicker");
const addColorBtn = document.getElementById("addColorBtn");
const saveImageBtn = document.getElementById("saveImageBtn");
let painting = false;

context.strokeStyle = "#000000";

// 그리기 시작
function startPainting() {
  painting = true;
}

//그리기 멈춤
function stopPainting() {
  painting = false;
}

/*
마우스 커서가 움직일 때
그리기 상태일 땐 이전 좌표에서 현재 좌표로 선을 그려주고
그리기 상태가 아닐 때는 선의 시작 지점을 현재 좌표로 설정
*/
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

// 미리 지정된 색이 선택되었을 때 선 색을 해당 색상으로 변경
function onColorSelect(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  colorPicker.value = convertRgbToHex(color);
}

// rgb 색상 값을 regex를 이용해 hex code로 변경해줌
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

// 사용자 입력값에 맞춰 캔버스 사이즈 변경
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
  brushSize.value = 1.0;
}

// 사용자 입력에 따라 선 굵기 변경
function onBrushSizeChange(event) {
  let size = event.target.value;
  context.lineWidth = size;
}

// input태그를 통해 색이 변경되었을 경우
function onColorChange(event) {
  context.strokeStyle = event.target.value;
}

// input태그에서 선택된 색을 지정 색상표에 추가
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

// 캔버스에 그려진 이미지를 저장
function saveImage() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "fromPainter";
  link.click();
}

// 캔버스 우클릭 방지
function preventRightClick(event) {
  event.preventDefault();
}

// html 요소들에 이벤트 추가
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
