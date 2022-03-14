'use strict'

var formArray = [
    {p: 'Для внесения вашего сайта в каталог, заполните форму:', name: 'dynForm'},
    {label: 'Разработчики:', type: 'text'},
    {label: 'Название сайта:', type: 'text'},
    {label: 'URL сайта:', type: 'text'},
    {label: 'Дата запуска сайта:', type: 'text'},
    {label: 'Посетителей в сутки:', type: 'text'},
    {label: 'E-mail для связи:', type: 'text'},
    {label: 'Рубрика каталога:', type: 'select',
        options: [{value: '1', text: 'здоровье'},{value: '2', text: 'домашний уют'}, {value: '3', text: 'бытовая техника'}]},
    {label: 'Размещение:', type: 'radio',
        options: [{value: 1, text: 'бесплатное'},{value: 2, text: 'платное'},{value: 3, text: 'VIP'}]},
    {label: 'Разрешить отзывы:', type: 'checkbox', checked: 'true'},
    {label: 'Описание сайта:', type: 'textarea'},
    {value: 'Опубликовать', type: 'submit'}
];

function createForm(arr, form) {
    arr.forEach(element => {
        var paragraph;
        var label;
        var text;
        var input;
        var select;
        var checkbox;
        var textarea;

        if (element.name === 'dynForm') {
            paragraph = document.createElement('p');
            text = document.createTextNode(element.p);
            paragraph.appendChild(text);
            form.appendChild(paragraph);
        }

        if (element.type === 'text') {
            paragraph = document.createElement('p');
            label = document.createElement('label');
            text = document.createTextNode(element.label);
            input = document.createElement('input');
            input.type = element.type;
            label.appendChild(text);
            label.appendChild(input);
            paragraph.appendChild(label);
            form.appendChild(paragraph);
        }

        if (element.type === 'select') {
            paragraph = document.createElement('p');
            label = document.createElement('label');
            text = document.createTextNode(element.label);
            select = document.createElement('select');
            select.name = element.name;
            label.appendChild(text);

            for (var i = 0; i < element.options.length; i++) {
                var option = document.createElement('option');
                option.value = element.options[i].value;
                text = document.createTextNode(element.options[i].text);
                option.appendChild(text);
                select.appendChild(option);
            }
            label.appendChild(select);
            paragraph.appendChild(label);
            form.appendChild(paragraph);
        }

        if (element.type === 'radio') {
            paragraph = document.createElement('p');
            label = document.createElement('label');
            text = document.createTextNode(element.label);
            label.appendChild(text);
            paragraph.appendChild(label);

            for (var i = 0; i < element.options.length; i++) {
                var radio = document.createElement('input');
                radio.value = element.options[i].value;
                radio.type = 'radio';
                radio.name = element.name;
                label = document.createElement('label');
                text = document.createTextNode(element.options[i].text);
                label.appendChild(radio);
                label.appendChild(text);
                paragraph.appendChild(label);
            }
            form.appendChild(paragraph);
        }

        if (element.type === 'checkbox') {
            paragraph = document.createElement('p');
            label = document.createElement('label');
            text = document.createTextNode(element.label);
            label.appendChild(text);
            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (element.checked) {
                checkbox.checked = true;
            }
            label.appendChild(checkbox);
            paragraph.appendChild(label);
            form.appendChild(paragraph);
        }

        if (element.type === 'textarea') {
            paragraph = document.createElement('p');
            label = document.createElement('label');
            text = document.createTextNode(element.label);
            textarea = document.createElement('textarea');
            label.appendChild(text);
            label.appendChild(textarea);
            paragraph.appendChild(label);
            form.appendChild(paragraph);
        }

        if (element.type === 'submit') {
            paragraph = document.createElement('p');
            input = document.createElement('input');
            input.type = element.type;
            input.value = element.value;
            paragraph.appendChild(input);
            form.appendChild(paragraph);
        }
    })
}
createForm(formArray, dynForm);
