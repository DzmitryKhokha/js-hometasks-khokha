'use strict'

var fieldWidth = '1000px';
var fieldHeight = '600px';
var score1 = 0;
var score2 = 0;

var wrapper = document.getElementById('wrapper');

var startButton = document.createElement('input');
var scoreField = document.createElement('div');
var racket1 = document.createElement('div');
var racket2 = document.createElement('div');
var ball = document.createElement('div');
var messageField = document.createElement('div');
var messageText = 'Goal!!!';

//задаем размеры поля field
wrapper.style.width = fieldWidth;
wrapper.style.height = fieldHeight;

requestAnimationFrame(tickTimer);

//кнопка старт начала игры
startButton.type = 'button';
startButton.value = 'Start!';
startButton.classList.add('startButton');
startButton = document.body.insertBefore(startButton, document.body.children[0]);
startButton.onclick = start;

//поле scoreField(счёт)
scoreField.classList.add('scoreField');
showScore();
function showScore() {
    scoreField.innerHTML = score1 + ':' + score2;
}
scoreField = document.body.insertBefore(scoreField, document.body.children[1]);

//ракетки
racket1 = wrapper.appendChild(racket1);
racket2 = wrapper.appendChild(racket2);
racket1.classList.add('racket1');
racket2.classList.add('racket2');

//поле с сообщением messageField
messageField.classList.add('messageField');
messageField = wrapper.appendChild(messageField);

//мячик ball
ball.classList.add('ball');
ball = wrapper.appendChild(ball);

var rackets = {
    racket1X: wrapper.getBoundingClientRect().left,
    racket1Y: wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height / 2 - racket1.getBoundingClientRect().height / 2,
    racket1Speed: 0,
    racket2X: wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width - racket2.getBoundingClientRect().width,
    racket2Y: wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height / 2 - racket1.getBoundingClientRect().height / 2,
    racket2Speed: 0,
    racketWidth: 15,
    racketHeight: 120,
    update: function () {
        var racket1Update = racket1;
        var racket2Update = racket2;
        racket1Update.style.left = this.racket1X + 'px';
        racket1Update.style.top = this.racket1Y + 'px';
        racket2Update.style.left = this.racket2X + 'px';
        racket2Update.style.top = this.racket2Y + 'px';
    }
}

var racketsSize = {
    width: 10,
    height: wrapper.getBoundingClientRect().height
};

rackets.update();

var ballParam = {
    ballX: wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width / 2 - ball.getBoundingClientRect().width / 2,
    ballY: wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height / 2 - ball.getBoundingClientRect().height / 2,
    ballSpeedX: 0,
    ballSpeedY: 0,
    ballWidth: 40,
    ballHeight: 40,
    update: function() {
        var thisBall = ball;
        thisBall.style.left = this.ballX + 'px';
        thisBall.style.top = this.ballY + 'px';
    }
};

var newBall = {
    width: wrapper.getBoundingClientRect().width,
    height: wrapper.getBoundingClientRect().height
};

ballParam.update();

window.addEventListener('keydown', function (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.keyCode === 17) {
        rackets.racket1Speed = 10;
    }
    if (EO.keyCode === 16) {
        rackets.racket1Speed = -10;
    }
    if (EO.keyCode === 40) {
        rackets.racket2Speed = 10;
    }
    if (EO.keyCode === 38) {
        rackets.racket2Speed = -10;
    }
});

window.addEventListener('keyup', function (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.keyCode === 17) {
        rackets.racket1Speed = 0;
    }
    if (EO.keyCode === 16) {
        rackets.racket1Speed  = 0;
    }
    if (EO.keyCode === 40) {
        rackets.racket2Speed = 0;
    }
    if (EO.keyCode === 38) {
        rackets.racket2Speed = 0;
    }
});

function start() {
    ballParam.ballSpeedX = 6;
    ballParam.ballSpeedY = 3;
}

function tickTimer() {
    rackets.update();
    rackets.racket1Y += rackets.racket1Speed;
    rackets.racket2Y += rackets.racket2Speed;

    //проверяем вышли ли ракетки вниз за поле
    if (rackets.racket1Y + rackets.racketHeight > (wrapper.getBoundingClientRect().top + racketsSize.height)) {
        rackets.racket1Y = wrapper.getBoundingClientRect().top + racketsSize.height - rackets.racketHeight;
    }
    if (rackets.racket2Y + rackets.racketHeight > (wrapper.getBoundingClientRect().top + racketsSize.height)) {
        rackets.racket2Y = wrapper.getBoundingClientRect().top + racketsSize.height - rackets.racketHeight;
    }

    //проверяем вышли ли ракетки вверх за поле
    if (rackets.racket1Y < wrapper.getBoundingClientRect().top) {
        rackets.racket1Y = wrapper.getBoundingClientRect().top;
    }
    if (rackets.racket2Y < wrapper.getBoundingClientRect().top) {
        rackets.racket2Y = wrapper.getBoundingClientRect().top;
    }

    ballParam.ballX -= ballParam.ballSpeedX;

    //проверяем вылетел ли мяч за правую стенку
    if ((ballParam.ballY + ballParam.ballHeight < rackets.racket2Y ||
        ballParam.ballY > (rackets.racket2Y + rackets.height)) &&
        ballParam.ballX + ballParam.ballWidth >= (wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width)) {
        score1 += 1;
        showScore();
        ballParam.ballSpeedX = 0;
        ballParam.ballSpeedY = 0;
        messageField.innerHTML = messageText;

        ballParam.ballX = wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width - ballParam.width - 1;
        window.setTimeout(function () {
            messageField.innerHTML = '';
            ballParam.ballX = wrapper.getBoundingClientRect().left + rackets.racketWidth;
            ballParam.ballY = rackets.racket1Y + rackets.racketHeight;
            start();
        }, 2000);
    } else if (!(ballParam.ballY + ballParam.ballHeight < rackets.racket2Y || ballParam.ballY > (rackets.racket2Y + rackets.racketHeight))
        && ballParam.ballX + ballParam.ballWidth > (rackets.racket2X)) {
        ballParam.ballSpeedX =- ballParam.ballSpeedX;
        ballParam.ballX = wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width - rackets.racketWidth - ballParam.ballWidth;
    }

    //проверяем вылетел ли мяч за левую стенку
    if ((ballParam.ballY + ballParam.ballHeight < rackets.racket1Y ||
        ballParam.ballY > (rackets.racket1Y + rackets.racketHeight))
        && ballParam.ballX <= (wrapper.getBoundingClientRect().left)) {

        score2 += 1;
        showScore();
        ballParam.ballSpeedX = 0;
        ballParam.ballSpeedY = 0;
        messageField.innerHTML = messageText;

        ballParam.ballX = wrapper.getBoundingClientRect().left + 1;

        window.setTimeout(function () {
            messageField.innerHTML = "";
            ballParam.ballX = wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width - rackets.racketWidth;
            ballParam.ballY = rackets.racket2Y + rackets.racketHeight / 2;
            start();
        }, 2000);

    } else if (!(ballParam.ballY + ballParam.ballHeight < rackets.racket1Y ||
        ballParam.ballY > (rackets.racket1Y + rackets.racketHeight)) &&
        ballParam.ballX < (rackets.racketWidth + rackets.racket1X)) {
        ballParam.ballSpeedX =- ballParam.ballSpeedX;
        ballParam.ballX = wrapper.getBoundingClientRect().left + rackets.racketWidth;
    }

    ballParam.ballY -= ballParam.ballSpeedY;

    //проверяем вылетел ли мяч вниз за поле
    if (ballParam.ballY + ballParam.ballHeight > (wrapper.getBoundingClientRect().top + newBall.height)) {
        ballParam.ballSpeedY =- ballParam.ballSpeedY;
        ballParam.ballY = wrapper.getBoundingClientRect().top + newBall.height - ballParam.ballHeight;
    }

    // вылетел ли мяч выше потолка?
    if (ballParam.ballY < wrapper.getBoundingClientRect().top) {
        ballParam.ballSpeedY =- ballParam.ballSpeedY;
        ballParam.ballY = wrapper.getBoundingClientRect().top;
    }

    ballParam.update();
    requestAnimationFrame(tickTimer);
}