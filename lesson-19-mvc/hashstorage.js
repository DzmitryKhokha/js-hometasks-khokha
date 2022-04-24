'use strict'

var pHash = {};

function TLocalStorage(name) {
  var self = this;

  self.reset = function () {
    localStorage.setItem(name, JSON.stringify(pHash));
  };

  self.addValue = function(key, value) {
    pHash[key] = value;
  };

  self.getValue = function(key) {
    return JSON.parse(localStorage[name])[key];
  };

  self.deleteValue = function(key) {
    return delete pHash[key];
  };

  self.getKeys = function() {
    return (Object.keys(JSON.parse(localStorage[name])));
  };
}

var drinkLocalStorage = new TLocalStorage('DrinkStorage');

function addDrink() {
  var drinkName = prompt('Введите название напитка', 'Test Drink').toLowerCase().trim();
  var fHash = {};

  if (drinkName) {
    fHash.recipe = prompt('Введите рецепт приготовления напитка', 'Test Recipe');
    fHash.alcohol = confirm('Ваш напиток алкогольный?') ? 'да' : 'нет';
    drinkLocalStorage.addValue(drinkName, fHash);
    drinkLocalStorage.reset();
  } else {
    alert('Ввод отменен!')
  }
}

function showDrinkInfo() {
  var drinkName = prompt('Введите название напитка: ','').toLowerCase().trim();
  var getDrinkInfo = (drinkName) ? drinkLocalStorage.getValue(drinkName) : 0;
  var resultHTML = '';

  if (getDrinkInfo) {
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
  var delDrinkInfo = drinkLocalStorage.deleteValue(drinkName);
  var resultHTML = '';

  if (delDrinkInfo) {
    resultHTML = 'Информация о напитке ' + drinkName + ' удалена';
  } else {
    resultHTML = 'Ошибка! Нет такого напитка';
  }
  document.getElementById('message').innerHTML = resultHTML;
  drinkLocalStorage.reset();
}

function showDrinksMenu() {
  var showMenuInfo = drinkLocalStorage.getKeys();
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
