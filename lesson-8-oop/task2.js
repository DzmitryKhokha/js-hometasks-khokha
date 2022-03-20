'use strict'

function isPal(string) {
    string = string.replace(/\s/g, '').toLowerCase();
    return string === string.split('').reverse().join('');
}

console.log(isPal('Anna'));
console.log(isPal('А роза упала на лапу Азора'));
console.log(isPal('Вася'));
console.log(isPal('12321'));
console.log(isPal('123212'));
