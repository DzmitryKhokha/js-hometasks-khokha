'use strict'

function questions() {
    var Question = function(question, answer, correctNumber) {
        this.question = question;
        this.answer = answer;
        this.correctNumber = correctNumber;
    }

    var question1 = new Question('In what year Columbus was born?',
        ['0-1551', '1-1451', '2-1998', '3-1245'], 1);
    var question2 = new Question('What was the name of Columbus?',
        ['0-John', '1-Mark', '2-Christopher', '3-Allan'], 2);
    var question3 = new Question('Who discovered America?',
        ['0-Columbus', '1-Puaro', '2-Indiana Johns', '3-David Beckham'], 0)

    var questions = [question1, question2, question3];

    var randomQuestionNumber = Math.floor(Math.random() * questions.length);

    Question.prototype.ShowQuestion = function () {
        console.log(this.question);
        var length = this.answer.length;
        for (var i = 0; i < length; i++) {
            console.log(this.answer[i]);
        }
    }

    questions[randomQuestionNumber].ShowQuestion();

    var userAnswer = parseInt(prompt('Select the correct number(0, 1, 2, 3)'));

    Question.prototype.checkAnswer = function (input) {
        if (input === this.correctNumber) {
            console.log('Yes, you are wright!');
        } else {
            console.log('No, you are wrong!')
        }
    }

    questions[randomQuestionNumber].checkAnswer(userAnswer);
}

questions();
