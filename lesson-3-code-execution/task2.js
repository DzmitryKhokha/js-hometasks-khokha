'use strict'

var image = {
    width: 100,
    height: 400,
    title: 'Cool image'
}

function multiplyNumeric(image) {

    for (var key in image) {

        if (typeof image[key] == "number") {
            image[key] *= 2;
        }
    }
    console.log(image);
}

multiplyNumeric(image);
