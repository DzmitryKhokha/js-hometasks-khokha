'use strict'

var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

function anClean(arr) {
    var cleanedArr = {};
    for (var i = 0; i < arr.length; i++) {
        var cleaned = arr[i].toLowerCase().split('').sort().join('');
        cleanedArr[cleaned] = arr[i];
    }
    return Object.values(cleanedArr);
}

console.log(anClean(arr));
