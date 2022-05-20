'use strict'
let page = document.getElementById('page');
let pHash = {};
window.onhashchange = renderNewState;

function renderNewState() {
    const hash = window.location.hash;
    let state = decodeURIComponent(hash.substr(1));

    if (state === '') {
        state = { page: 'Main' };
    } else {
        state = JSON.parse(state);
    }
    document.getElementById('page').innerHTML = '';

    switch (state.page) {
        case 'Main':
            page.appendChild(createMainPage());
            break;
        case 'Сontents':
            page.innerHTML = '<h2>Оглавление</h3>';
            let sortHash = sortObject(pHash)
            displayListOfArticles(sortHash, page)
            break;
        default:
            $.ajax(`${JSON.parse(decodeURIComponent(window.location.hash.substr(1))).page}.html`,
                {
                    type: "GET",
                    cache: false,
                    dataType: "html",
                    success: function (content) {
                        document.getElementById('wrapper').innerHTML = content;
                    },
                }
            );
            displayListOfArticles(pHash, page);
            break;
    }
}

function switchToState(state) {
    location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToMain() {
    switchToState({ page: 'Main' });
}
function switchToContents() {
    switchToState({ page: 'Сontents' });
}

renderNewState();

function createMainPage() {
    let mainPage = document.createElement('div');
    let heading = document.createElement('p');
    heading.innerHTML = '<h2>Энциклопедия</h3>';
    heading.style.fontWeight = "bold";
    let link = document.createElement('a');
    link.textContent = "Список статей здесь";
    link.style.textDecoration = "underline";
    link.onclick = switchToContents;
    mainPage.appendChild(heading);
    mainPage.appendChild(link);
    return mainPage;
}

//сортировка ключей объекта
function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function readValueOnTheServer() {

    $.ajax("article.json",
        {
            type: "GET",
            cache: false,
            dataType: "json",
            success: showDataFromJson,
        }
    );

    function showDataFromJson(data) {
        pHash = data;
        console.log('[showDataFromJson]', data)
    }
}

readValueOnTheServer()

//сортировка по буквам
function displayListOfArticles(data, box) {
    let charCode;
    let location = JSON.parse(decodeURIComponent(window.location.hash.substr(1))).page;
    for (let key in data) {
        if (location === 'Сontents') {
            document.getElementById('content').innerHTML = ''
            box.style.overflow = 'inherit';
            box.style.width = '100%';
            if (!charCode) {
                charCode = 1040;
                box.innerHTML += '<h3>A</h3>';
            } else if (key.charCodeAt(0) !== charCode) {
                charCode = key.charCodeAt(0);
                box.innerHTML += `<h3>${String.fromCharCode(charCode)}</h3>`;
            }
        }
        let a = document.createElement('a');
        a.innerText = key;
        a.href = `#%7B"page"%3A"${data[key]}"%7D`;

        box.appendChild(a);
        a.addEventListener('click', (e) => {
            document.title = e.target.innerText;
            $.ajax(`${data[key]}.html`,
                {
                    type: "GET",
                    cache: false,
                    dataType: "html",
                    success: function (content) {
                        document.getElementById('content').innerHTML = content;

                    },
                }
            );
        })
    }
}
