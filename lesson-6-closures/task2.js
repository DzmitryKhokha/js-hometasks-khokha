'use strict'

function interviewQuestion(profession) {
    return function (name) {
        if (profession === 'designer') {
            console.log(profession + ' -> ' + name + ' can you please explain what UX design is?');
        } else if (profession === 'teacher') {
            console.log(profession + ' -> ' + 'What subject do you teach ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}
interviewQuestion('designer')('John');
interviewQuestion('teacher')('John');
interviewQuestion('doctor')('John');
