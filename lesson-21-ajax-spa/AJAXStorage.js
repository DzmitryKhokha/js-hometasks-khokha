'use strict'
function TAJAXStorage() {
    var pHash = {};
    var Link = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    var updatePassword;
    var userInfo = 'Dmitry_Khokha';

        $.ajax(Link,{
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: { f: 'READ', n: userInfo },
                success: readResult,
                error: errorHandler
            }
        );

        function readResult(callResult) {
            if (callResult !== ' ') {
                pHash = JSON.parse(callResult.result);
                console.log('readResult: ' + callResult.result);
            } else if (callResult === ' ') {
                $.ajax(Link, {
                        type: 'POST',
                        cache: false,
                        dataType: 'json',
                        data: { f: 'INSERT', n: userInfo, v: JSON.stringify(pHash) },
                        success: callResultInsert,
                        error: errorHandler
                    }
                );

                function callResultInsert(callResult) {
                    console.log('callResultInsert: ' + callResult.result);
                }
            }
        }

        function storeInfo(hash) {
            updatePassword = Math.random();

            $.ajax(Link,{
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    data: { f: 'LOCKGET', n: userInfo, p: updatePassword },
                    success: lockGetReady,
                    error: errorHandler
                }
            );

            function lockGetReady(callResult) {
                console.log('lockGetReady: ' + callResult.result);

                $.ajax(Link,{
                        type: 'POST',
                        cache: false,
                        dataType: 'json',
                        data: { f: 'UPDATE', n: userInfo, v: JSON.stringify(hash), p: updatePassword },
                        success: updateReady,
                        error: errorHandler
                    }
                );

                function updateReady(callResult) {
                    console.log('updateReady: ' + callResult.result);
                }
            }
        }

        function errorHandler(jqXHR, statusStr, errorStr) {
            alert(statusStr + ' ' + errorStr);
        }

    var self = this;

    self.addValue = function(key, value) {
        pHash[key] = value;
        storeInfo(pHash);
    };

    self.getValue = function(key) {
        return pHash[key];
    };

    self.deleteValue = function(key) {
        if (key in pHash) {
            delete pHash[key];
            storeInfo(pHash);
            return true;
        } else {
            return false;
        }
    };

    self.getKeys = function() {
        return (Object.keys(pHash));
    };
}
