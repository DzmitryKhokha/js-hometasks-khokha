'use strict'

var tasksCompleted = {
    'Anna': 29,
    'Sergei': 35,
    'Elena': 1,
    'Anton': 99
};

function maxTasks () {
    var max = 0;
    var maxTaskUser;

    for(var key in tasksCompleted) {

        var keyValues = tasksCompleted[key];

        if (max < keyValues) {
            keyValues = max;
            maxTaskUser = key;
        }
    }

    return maxTaskUser;
}

alert('Сотрудник выполнивший больше всех задач: ' + maxTasks());
