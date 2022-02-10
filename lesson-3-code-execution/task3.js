'use strict'

var array = [];

while (true) {

    var number = prompt('Введитк число: ', '');
    console.log(number);

    if (number === '' || number === null || !isFinite(parseInt(number)))
        break;

    array.push(+number);

}

console.log(array);

var sum = 0;

for (var numbers of array) {
    sum += numbers;
}

console.log('Сумма всех значений массива: ' + sum);
