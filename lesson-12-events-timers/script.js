'use strict'

var clock = document.getElementById('clock'); //находим div по id
var clockDiv = document.createElement('div'); //создаем div для часов
var clockFaceRadius = 140;// радиус для часов
var digitalClockRadius = 80;
var valueAngle = 0;
var angle;
var angleBtwHours = 360 / 12; // угол между цифрами на часах
const HoursNumbers = 12;

// создаем div-ы для стрелки часов, минут и секунд
var hoursArrow = document.createElement('div');
var minutesArrow = document.createElement('div');
var secondsArrow = document.createElement('div');

// определяем где должны быть стрелки по текущему времени
var currentTime = new Date(); // определяем текущее время
var hoursArrowPos = 30 * (currentTime.getHours() + (1 / 60) * currentTime.getMinutes());
var minutesArrowPos = 6 * (currentTime.getMinutes() + (1 / 60) * currentTime.getSeconds());
var secondsArrowPos = 6 * currentTime.getSeconds() - 6;

// найдем центр clock
var clockXCenter = clock.offsetLeft + clock.offsetWidth / 2;
var clockYCenter = clock.offsetTop + clock.offsetHeight / 2;


// организуем цикл от 1 до 12
for (var i = 1; i <= HoursNumbers; i++) {
    var clockHours = document.createElement('div'); // создаем div для номера часа
    valueAngle += angleBtwHours;
    angle = valueAngle / 180 * Math.PI;
    clockHours = clock.appendChild(clockHours); // делаем div для номеров дочерним элементом
    clockHours.classList.add('hours'); // добавляем готовый класс стилей
    clockHours.innerHTML = i;

    // узнаем центр div-а для номеров часа
    var clockHoursXCenter = clockXCenter + clockFaceRadius * Math.sin(angle);
    var clockHoursYCenter = clockYCenter - clockFaceRadius * Math.cos(angle);

    clockHours.style.left = Math.round(clockHoursXCenter - clockHours.offsetWidth / 2) + 'px';
    clockHours.style.top = Math.round(clockHoursYCenter - clockHours.offsetHeight / 2) + 'px';
}

clockDiv = clock.appendChild(clockDiv); // созданный элемент вставляем в конец элемента clock
hoursArrow = clock.appendChild(hoursArrow);
minutesArrow = clock.appendChild(minutesArrow);
secondsArrow = clock.appendChild(secondsArrow);

// добавляем классы стилей для стрелок
hoursArrow.classList.add('hoursArrow');
minutesArrow.classList.add('minutesArrow');
secondsArrow.classList.add('secondsArrow');

// определяем где будут стоять стрелки
hoursArrow.style.left = clockXCenter - hoursArrow.offsetWidth / 2 + 'px'; // стрелка часа
hoursArrow.style.top = clockYCenter - hoursArrow.offsetHeight + 10 + 'px';

minutesArrow.style.left = clockXCenter - minutesArrow.offsetWidth / 2 + 'px'; // стрелка минут
minutesArrow.style.top = clockYCenter - minutesArrow.offsetHeight + 10 + 'px';

secondsArrow.style.left = clockXCenter - secondsArrow.offsetWidth / 2 + 'px'; // стрелка секунд
secondsArrow.style.top = clockYCenter - secondsArrow.offsetHeight + 10 + 'px';

// трансформация стрелок
hoursArrow.style.transformOrigin = 'center 80px';
minutesArrow.style.transformOrigin = 'center 110px';
secondsArrow.style.transformOrigin = 'center 135px';

// определяем где будут стоять цифровые часы
clockDiv.style.left = clockXCenter - clockDiv.offsetWidth / 4 + 'px';
clockDiv.style.top = clockYCenter + digitalClockRadius - 180 + 'px';

// добавляем класс стилей для цифровых часов
clockDiv.classList.add('digitalClock');

function arrow() {
    // добавляем электронные часы
    var currentTime = new Date();
    clockDiv.innerHTML = currentTime.toLocaleTimeString();

    hoursArrowPos += 6 * (1 / 360);
    hoursArrow.style.transform = 'rotate(' + hoursArrowPos + 'deg)';

    minutesArrowPos += 6 * (1 / 60);
    minutesArrow.style.transform = 'rotate(' + minutesArrowPos + 'deg)'

    secondsArrowPos += 6;
    secondsArrow.style.transform = 'rotate(' + secondsArrowPos + 'deg)';
}

window.onload = arrow;
window.setInterval(arrow, 1000);
