'use strict'

var array = [];
var sum = 0;

do {
    var number = prompt('Введите число: ', '');
    if (number === '' || number === null || !isFinite(parseInt(number))) {
        break;
    }
    console.log(number);
    array.push(+number);
    console.log(array);
} while (true)

for (var numbers of array) {
    sum += numbers;
}
console.log(array);
console.log('Сумма всех значений массива: ' + sum);
