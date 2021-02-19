const canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let painting = false;
let colors = document.getElementsByClassName('color');
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


if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener('mousedown', onColorSelect));
}