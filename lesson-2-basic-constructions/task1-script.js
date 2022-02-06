'use strict'

function findVowels () {
    var userStr = prompt('Введите строку на русском языке: ', '');
    var vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    var count = 0;

    for (var char of userStr.toLowerCase()) {
        if (vowels.includes(char)) {
            count += 1;
        }
    }
    return count;
}

console.log('Кол-во гласных букв в строке: ' + findVowels());
