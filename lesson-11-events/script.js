'use strict'

var dragImage = null;
var dragShiftX;
var dragShiftY;

var container = document.getElementById('container');
var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.addEventListener('mousedown', dragStart, false);
    image.addEventListener('mouseover', mouseOver, false);
    image.addEventListener('mouseout', mouseOut, false);
}

function dragStart(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    dragImage = EO.target;

    var mouseX = EO.pageX;
    var mouseY = EO.pageY;
    var imageX = dragImage.offsetLeft;
    var imageY = dragImage.offsetTop;

    dragShiftX = mouseX - imageX;
    dragShiftY = mouseY - imageY;

    window.onmousemove = dragMove;
    window.onmouseup = dragStop;

    dragImage.style.position = 'absolute';
    dragImage.style.cursor = 'pointer';

    container.appendChild(dragImage);
}

function dragMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    var mouseX = EO.pageX;
    var mouseY = EO.pageY;
    var imageX = mouseX - dragShiftX;
    var imageY = mouseY - dragShiftY;

    dragImage.style.left = imageX + 'px';
    dragImage.style.top = imageY + 'px';
}

function dragStop(EO) {
    EO.preventDefault();
    window.onmousemove = null;
    window.onmouseup = null;
}

function mouseOver(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.target.style.border = '1px solid black';
    EO.target.style.cursor = 'pointer';
}

function mouseOut(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.target.style.border = 'none'
}
