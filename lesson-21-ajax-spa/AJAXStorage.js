'use strict'
let hash = {};
var link = 'https://fe.it-academy.by/AjaxStringStorage2.php';
var updatePassword;
var userInfo = 'Dmitry_Khokha';

function TAJAXStorage() {
    var self = this;
    self.setStorage = function () {
        storeInfo();
    }
}

function restoreInfo() {
    $.ajax({
        url: link,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: { f: 'READ', n: userInfo },
        success: readReady,
        error: errorHandler
        }
    );
}

function readReady(callResult) {
    if (callResult.error !== undefined) {
        alert(callResult.error);
    } else if (callResult.result !== '') {
        hash = JSON.parse(callResult.result);
    }
}

restoreInfo();

function storeInfo() {
    updatePassword = Math.random();
    $.ajax({
        url: link,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {f: 'LOCKGET', n: userInfo, p: updatePassword},
        success: lockGetReady,
        error: errorHandler
        }
    );
}

function lockGetReady(callResult) {
    if (callResult.error !== undefined) {
        alert(callResult.error)
    } else {
        let info = hash;
        $.ajax({
                url: link,
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: { f: 'UPDATE', n: userInfo, v: JSON.stringify(hash), p: updatePassword },
                success: updateReady,
                error: errorHandler
        }
        );
    }
}

function updateReady(callResult) {
    if (callResult.error !== undefined)
        alert(callResult.error);
}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
}

