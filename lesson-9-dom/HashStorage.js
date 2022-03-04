'use strict'

function THashStorage() {
    var storage = {};

    this.addValue = function(key, value) {
        storage[key] = value;
    }

    this.getValue = function(key) {
        return storage[key];
    }

    this.deleteValue = function(key) {
        if (key in storage) {
            return delete storage[key];
        } else {
            return false;
        }
    }

    this.getKeys = function () {
        return Object.keys(storage);
    }

    this.checkKeys = function (key) {
        if (key in storage) {
            return true;
        }
    }

}

var DrinkStorage = new THashStorage();

function addInfo () {
    var cocktailName = prompt('Введите название коктейля');
    var cocktailType = prompt('Коктейль алкогольный?');
    var cocktailRecipe = prompt('Введите рецепт коктейля');
    DrinkStorage.addValue(cocktailName, {name: cocktailName ,type: cocktailType,
        recipe: cocktailRecipe});
    console.log('Was added', DrinkStorage.getValue(cocktailName));
}

var addButton = document.getElementById('add-cocktail');
addButton.addEventListener("click", addInfo);

var infoButton = document.getElementById('cocktail-info');
infoButton.addEventListener("click", function () {
    var cocktailName = prompt('Введите название коктейля: ');
    var cocktailType = DrinkStorage.getValue(cocktailName);
    if (DrinkStorage.checkKeys(cocktailName)) {
        var infoWindow = document.getElementById('info');
        infoWindow.innerHTML = '<span>Напиток: </span>' + cocktailName + '<br>' +
            '<span>Алкогольный: </span>' + cocktailType.type + '<br>' +
            '<span>Рецепт: </span>' + cocktailType.recipe;
    } else {
        alert('Такого напитка нет в списке!');
    }
})

function deleteInfo () {
    var cocktailName = prompt('Введите название коктейля который хотите удалить');
    if (DrinkStorage.deleteValue(cocktailName)) {
        alert('Коктейль удалён!');
    }
}

var deleteButton = document.getElementById('delete-cocktail');
deleteButton.addEventListener("click", deleteInfo);

function cocktailList () {
    var infoWindow = document.getElementById('info');
    infoWindow.innerHTML = DrinkStorage.getKeys();
}

var listButton = document.getElementById('cocktail-list');
listButton.addEventListener("click", cocktailList);
