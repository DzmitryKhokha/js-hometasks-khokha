'use strict'

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// центр canvas
let canvasCenterX = canvas.offsetWidth / 2;
let canvasCenterY = canvas.offsetHeight / 2;

// clockFace
let clockFaceRadius = 190;
let angleValue = 0;
let digitsAngle = 30; //расстояние в градусах между цифрами
let digitsNumber = 12;

// для электронных часов
let digitalWatchWidth = 160;
let digitalWatchHeight = 40;
let digitalWatchRadius = 90;

function createClockFace() {
    context.fillStyle = 'rgb(206,208,206)';
    context.beginPath();
    context.arc(canvasCenterX, canvasCenterY, 240, 0, Math.PI*2, false);
    context.fill();

    for (let i = 1; i <= digitsNumber; i++) {
        let digitsCircleRadius = 35;
        let digitsCircleColor = '#efeeee';
        angleValue += digitsAngle;
        let angle = angleValue / 180 * Math.PI;
        let digitsCircleCx = Math.round(canvasCenterX + clockFaceRadius * Math.sin(angle));
        let digitsCircleCy = Math.round(canvasCenterY - clockFaceRadius * Math.cos(angle));

        context.beginPath();
        context.fillStyle = digitsCircleColor;
        context.arc(digitsCircleCx, digitsCircleCy, digitsCircleRadius, 0, Math.PI*2, false);
        context.fill();

        context.fillStyle = 'black';
        context.font = '30px normal';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(i.toString(), digitsCircleCx, digitsCircleCy);
    }
}

function createHourArrow() {
    let now = new Date();
    let hourArrowAngle = 30 * (now.getHours() + (1 / 60) * now.getMinutes());
    context.strokeStyle = 'rgb(56,56,56)';
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(canvasCenterX, canvasCenterY);
    context.lineTo(canvasCenterX + 110 * Math.sin(hourArrowAngle / 180 * Math.PI),
        canvasCenterY - 110 * Math.cos(hourArrowAngle / 180 * Math.PI));
    context.stroke();
}

function  createMinuteArrow() {
    let now = new Date();
    let minuteArrowAngle = 6 * (now.getMinutes() + (1 / 60) * now.getSeconds());
    context.strokeStyle = 'rgb(56,56,56)';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(canvasCenterX, canvasCenterY);
    context.lineTo(canvasCenterX + 140 * Math.sin(minuteArrowAngle / 180 * Math.PI),
        canvasCenterY - 140 * Math.cos(minuteArrowAngle / 180 * Math.PI))
    context.stroke();
}

function createSecondsArrow() {
    let now = new Date();
    let secondsArrowAngle = 6 * now.getSeconds();
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(canvasCenterX, canvasCenterY);
    context.lineTo(canvasCenterX + 180 * Math.sin(secondsArrowAngle / 180 * Math.PI),
        canvasCenterY - 180 * Math.cos(secondsArrowAngle / 180 * Math.PI));
    context.stroke();
}

function  createDecorativeDot() {
    context.fillStyle = 'rgb(40,40,40)';
    context.beginPath();
    context.arc(canvasCenterX, canvasCenterY, 10, 0, Math.PI*2, false);
    context.fill();
}

function digitalClock() {
    let now = new Date();
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'rgb(206,208,206)';
    context.beginPath();
    context.fillRect(canvasCenterY - digitalWatchWidth / 2,
        canvasCenterY - digitalWatchRadius - digitalWatchHeight / 2, 180, 40);
    context.fill();
    context.fillStyle = 'black';
    let digitalWatchText = now.toLocaleTimeString();
    context.font = '35px normal';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(digitalWatchText, canvasCenterX, canvasCenterY - digitalWatchRadius);
    context.fill();
}

function createClock() {
    createClockFace();
    digitalClock();
    createSecondsArrow();
    createMinuteArrow();
    createHourArrow();
    createDecorativeDot();
}

setInterval(createClock, 1000);
