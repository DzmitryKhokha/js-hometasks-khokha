'use strict'

var reg = /\D/;

do {
    var userSurname = prompt('Введите вашу фамилию:', "");

    if ( !(reg.test(userSurname)) ) {
        alert ('Некорректный ввод данных! Введите заново фамилию');
    } else if (userSurname == null) {
        alert('Давайте введем вашу фамилию :))');
    } else {
        break;
    }
}
while (true);

do {
    var userName = prompt('Введите ваше имя:', "");

    if ( !(reg.test(userName)) ) {
        alert ('Некорректный ввод данных! Введите заново имя');
    } else if (userName == null) {
        alert('Давайте введем ваше имя :)))');
    } else {
        break;
    }
}
while (true);

do {
    var userPatronymic = prompt('Введите ваше отчество:', "");

    if ( !(reg.test(userPatronymic)) ) {
        alert ('Некорректный ввод данных! Введите заново отчество');
    } else if (userPatronymic == null) {
        alert('Давайте введем ваше отчество :))))');
    } else {
        break;
    }
}
while (true);

do {
    var userAge = parseInt(prompt('Введите ваш возраст:', ''));

    if (isNaN(userAge)) {
        alert('Разрешен ввод только цифр! Не стесняйтесь :))')
    } else {
        break;
    }
}
while (true);

var userGender = confirm('Ваш пол мужской?');
var pension = false;

if (userGender  && (userAge >= 63)) {
    pension = true;
} else if ((!userGender) && (userAge >= 58)) {
    pension = true;
}

userGender = (userGender) ? 'мужской' : 'женский';
pension = (pension) ? 'да' : 'нет';

var userFullName = userSurname + ' ' + userName + ' ' + userPatronymic;
var userAgeInDays = userAge * 365;

var userData = 'Ваше ФИО: ' + userFullName + '\n' + 'Ваш возраст в годах: ' + userAge + '\n' +
    'Ваш возраст в днях: ' + userAgeInDays + '\n' + 'Через 5 лет вам будет: ' + (userAge + 5) + '\n' +
    'Ваш пол: ' + userGender + '\n' + 'Вы на пенсии: ' + pension;

alert (userData);
