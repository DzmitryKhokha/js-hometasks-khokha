'use strict'

var str = '';
var n = 8;

for (var i = 0; i < n * n + n - 1; i++) {
    if (i === 0 || i % 2 === 0) {
        str += '#'
    } else {
        str += ' ';
    }
    if ((str.length + 1) % (n + 1) === 0) {
        str += '\n';
        i += 1;
    }
}

console.log(str);
