const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let painting = false;
let colors = document.getElementsByClassName('color');
let sizeChangeBtn = document.getElementById('sizeChangeBtn');

context.strokeStyle = '#000000';

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting){
        context.lineTo(x, y);
        context.stroke();

    }
    else{
        context.beginPath();
        context.moveTo(x, y);
    }
}

function onColorSelect(event){
    const color = event.target;
    context.strokeStyle = color.style.backgroundColor;
}

function onCanSizeChange(event){
    const canWidth = document.getElementById('canWidth');
    const canHeight = document.getElementById('canHeight');
    
    if(Number.parseInt(canWidth.value) > Number.parseInt(canWidth.max)){
        canWidth.value = canWidth.max;
    }
    if(Number.parseInt(canHeight.value) > Number.parseInt(canHeight.max)){
        canHeight.value = canHeight.max;
    }

    canvas.style.width = canWidth.value + 'px';
    canvas.style.height = canHeight.value + 'px';
    canvas.width = canWidth.value;
    canvas.height = canHeight.value;
}


if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener('mousedown', onColorSelect));
}

if(sizeChangeBtn){
    sizeChangeBtn.addEventListener('click', onCanSizeChange);
}