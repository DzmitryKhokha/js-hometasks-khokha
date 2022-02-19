'use strict'

var johnPayments = {
    name: 'John',
    bills: [124, 48, 268, 180, 42],
    tips: [],
    billTipPaid: [],
    calcTips: function () {
        for (var i = 0; i < this.bills.length; i++) {
            if (this.bills[i] < 50) {
                this.tips.push(this.bills[i] * 0.2);
            } else if (this.bills[i] >= 50 && this.bills[i] <= 200) {
                this.tips.push(this.bills[i] * 0.15);
            } else {
                this.tips.push(this.bills[i] * 0.1);
            }
        }
        for (var i = 0; i < this.tips.length; i++) {
            this.billTipPaid.push(this.tips[i] + this.bills[i]);
        }
    }
}

johnPayments.calcTips();
console.log('John paid tips: ' + johnPayments.tips + '\n'
    + 'John paid (tips + bills): ' + johnPayments.billTipPaid);
console.log('\n'); //для лучшей читаемости в консоли

var markPayments = {
    name: 'Mark',
    bills: [77, 375, 110, 45],
    tips: [],
    billTipPaid: [],
    calcTips: function () {
        for (var i = 0; i < this.bills.length; i ++) {
            if (this.bills[i] < 100) {
                this.tips.push(this.bills[i] * 0.2);
            } else if (this.bills[i] >= 100 && this.bills[i] <= 300) {
                this.tips.push(this.bills[i] * 0.1);
            } else {
                this.tips.push(this.bills[i] * 0.25);
            }
        }
        for (var i = 0; i < this.tips.length; i++) {
            this.billTipPaid.push(this.tips[i] + this.bills[i]);
        }
    }
}

markPayments.calcTips();
console.log('Mark paid tips: ' + markPayments.tips + '\n' +
    'Mark paid (tips + bills): ' + markPayments.billTipPaid);
console.log('\n'); //для лучшей читаемости в консоли

function averageTips (tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++) {
        sum += tips[i];
    }
    return sum / tips.length;
}

console.log('John`s family average tips: ' + averageTips(johnPayments.tips));
console.log('Mark`s family average tips: ' + averageTips(markPayments.tips));

if (averageTips(johnPayments.tips) > averageTips(markPayments.tips)) {
    console.log('John`s family paid more tips(average)');
} else if (averageTips(johnPayments.tips) < averageTips(markPayments.tips)) {
    console.log('Mark`s family paid more tips(average)');
} else {
    console.log('John`s and Mark`s family paid the same tips(average)');
}
