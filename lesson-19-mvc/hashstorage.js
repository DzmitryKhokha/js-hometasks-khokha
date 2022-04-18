'use strict'

var pHash = {};

function THashStorage() {
  var self = this;


  self.addValue = function(key, value) {
    pHash[key] = value;
  };

  self.getValue = function(key) {
    return pHash[key];
  };

  self.deleteValue = function(key) {
    return delete pHash[key];
  };

  self.getKeys = function() {
    return (Object.keys(pHash));
  };
}

function TLocalStorage(object) {
  this.object = object;
  this.setLocalStorage = function () {
    localStorage[this.object] = JSON.stringify(pHash);
  };
  this.getLocalStorage = function () {
    if(localStorage[this.object] != null) {
      pHash = JSON.parse(localStorage[this.object]);
    }
  }
}

var drinkStorage = new THashStorage();
var drinkLocalStorage = new TLocalStorage();

function addDrink() {
  var drinkName = prompt('Введите название напитка', 'Test Drink').toLowerCase().trim();
  var fHash = {};

  if (drinkName) {
    fHash.recipe = prompt('Введите рецепт приготовления напитка', 'Test Recipe');
    fHash.alcohol = confirm('Ваш напиток алкогольный?') ? 'да' : 'нет';
    drinkLocalStorage.getLocalStorage();
    drinkStorage.addValue(drinkName, fHash);
    drinkLocalStorage.setLocalStorage();
  } else {
    alert('Ввод отменен!')
  }
}

function showDrinkInfo() {
  var drinkName = prompt('Введите название напитка: ','').toLowerCase().trim();
  var getDrinkInfo = (drinkName) ? drinkStorage.getValue(drinkName) : 0;
  var resultHTML = '';

  if (getDrinkInfo) {
    drinkLocalStorage.getLocalStorage();
    var print1 = 'Напиток: ' + drinkName + '<br>';
    var print2 = 'Алкогольный: ' + getDrinkInfo.alcohol + '<br>';
    var print3 = 'Рецепт приготовления: ' + getDrinkInfo.recipe + '<br>';

    resultHTML = print1 + print2 + print3;
  } else {
    resultHTML = 'Ошибка! Нет такого напитка';
  }
  document.getElementById('message').innerHTML = resultHTML;
}

function removeDrink() {
  var drinkName = prompt('Какой напиток удалить?').toLowerCase().trim();
  drinkLocalStorage.getLocalStorage();
  var delDrinkInfo = drinkStorage.deleteValue(drinkName);
  var resultHTML = '';

  if (delDrinkInfo) {
    resultHTML = 'Информация о напитке ' + drinkName + ' удалена';
    drinkLocalStorage.setLocalStorage();
  } else {
    resultHTML = 'Ошибка! Нет такого напитка';
  }
  document.getElementById('message').innerHTML = resultHTML;
}

function showDrinksMenu() {
  drinkLocalStorage.getLocalStorage();
  var showMenuInfo = drinkStorage.getKeys();
  var resultHTML = '';

  if (showMenuInfo.length) {
    for (var i = 0; i < showMenuInfo.length; i++) {
      resultHTML += (i + 1) + '. ' + showMenuInfo[i] + '<br>';
    }
  } else {
    resultHTML = 'Меню пустое, добавьте напитки.';
  }
  document.getElementById('message').innerHTML = resultHTML;
}
