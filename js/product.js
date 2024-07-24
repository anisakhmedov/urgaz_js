
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const carpetIdPage = getProductIdFromUrl();

function getCarpetIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id').split('?carpetID=')[1]
}

const carpetCodeIdPage = getCarpetIdFromUrl();
let apiCarpets = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com/'

let vizual = []
let colors = []
let widthArray = 5

if(window.innerWidth > 950){
    widthArray = 5
} else if(window.innerWidth <= 950){
    widthArray = 3
}

let getCarpetsProd = () => {
    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
    }

    axios.get(apiCarpets + 'carpets')
        .then((res) => uploadCarpetArray(getMultipleRandom(res.data, widthArray)))
        .catch((err) => console.error(err))

    axios.get(apiCarpets + 'carpets/' + carpetIdPage)
        .then((res) => {
            vizual = res.data.image_taft.map(item => item.image_taft);
            colors = res.data.image_carpet.map(item => item.image_carpet);

            function extractValue(str) {
                const match = str.match(/-(\d+)_/);
                return match ? parseInt(match[1], 10) : null;
            }

            // Сортировка массива по извлеченному значению
            vizual.sort((a, b) => {
                const valA = extractValue(a);
                const valB = extractValue(b);
                return valA - valB;
            });

            colors.sort((a, b) => {
                const valA = extractValue(a);
                const valB = extractValue(b);
                return valA - valB;
            });

            let info = document.querySelector('.info')

            let title = document.createElement('h2')
            title.innerHTML = res.data.title
            let categories = document.createElement('p')
            categories.innerHTML = 'Категория: ' + res.data.categories_ru
            let puchok = document.createElement('p')
            puchok.innerHTML = 'Количество пучков: ' + res.data.valuePuchok
            let weight = document.createElement('p')
            weight.innerHTML = 'Вес: ' + res.data.weight
            let vorse = document.createElement('p')
            vorse.innerHTML = 'Ворс: ' + res.data.vorse
            let valueNow = document.createElement('p')
            valueNow.innerHTML = 'В наличии: ' + res.data.image_carpet.length
            let btn = document.createElement('button')
            btn.innerHTML = 'Добавить в избранное'

            let userNow = []

            axios.get(apiCarpets + 'users/' + localStorage.user)
                .then((res) => userNow = res.data)
                .catch((err) => console.error(err))

            btn.onclick = () => {
                let sendObj = userNow

                if (!userNow.codeCarpets) sendObj.codeCarpets = carpetCodeIdPage
                else sendObj.codeCarpets = userNow.codeCarpets + ', ' + carpetCodeIdPage

                console.log(sendObj);
                axios.patch(`${apiCarpets}users/${localStorage.user}`, sendObj)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
            info.append(categories, title, valueNow, vorse, weight, puchok, btn)

            uploadCarpets(vizual, colors)
        })
        .catch((err) => {
            console.log(err);
        })
}
getCarpetsProd()

let mainCarp = document.querySelector('.main-carousel img')
let selectCarpet = document.querySelector('.thumbnails')

let uploadCarpets = (v, c) => {
    for (let item of c) {
        let img = document.createElement('img')
        img.src = apiCarpets + item
        selectCarpet.appendChild(img)

        img.onclick = () => {

            let code = item.split('-')[1].split('.')[0]
            if (window.location.href.includes('carpetID')) {
                window.location.href = window.location.href.replace(`carpetID=${carpetCodeIdPage}`, `carpetID=${code}`)
            } else {
                window.location.href = `product.html?id=${carpetIdPage}?carpetID=${code}#${usefullHash}`
            }
            for (let carpetTaft of v) {
                if (carpetTaft.toLowerCase().includes(code.toLowerCase())) {
                    mainCarp.src = apiCarpets + carpetTaft
                    img.classList.add('active')
                }
            }
            for (let items of selectCarpet.children) {
                if (mainCarp.src.split('-')[3].split('.')[0].toLowerCase() != items.src.split('-')[3].split('.')[0].toLowerCase()) {
                    items.classList.remove('active')
                }
            }
        }
        if (carpetCodeIdPage != undefined) {

            for (let item of v) {
                if (item.toLowerCase().includes(carpetCodeIdPage.toLowerCase())) {
                    mainCarp.src = apiCarpets + item
                }
            }
            for (let item of selectCarpet.children) {
                if (item.src.toLowerCase().includes(carpetCodeIdPage.toLowerCase())) {
                    function centerItVariableWidth(target, outer) {
                        var out = $(outer);
                        var tar = $(target);
                        var x = out.width();
                        var y = tar.outerWidth(true);
                        var z = tar.index();
                        var q = 0;
                        var m = out.find('li');

                        for (var i = 0; i < z; i++) {
                            q += $(m[i]).outerWidth(true);
                        }

                        out.scrollLeft(Math.max(0, q - (x - y) / 2));
                    }

                    centerItVariableWidth(item, '.thumbnails');
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            }
        } else if (carpetCodeIdPage == undefined) {
            mainCarp.src = apiCarpets + v[0]
        }
    }
}

let wrapper = document.querySelector('.other-carpets')

let uploadCarpetArray = (param) => {
    wrapper.innerHTML = ''
    for (let item of param) {
        let mainDiv = document.createElement('div')
        let mainDivImg = document.createElement('div')
        let mainDivImages = document.createElement('img')

        let button = document.createElement('button')
        let link = document.createElement('p')

        button.onclick = () => {
            window.location.href = `product.html?id=${item._id}#${usefullHash}`
        }

        link.innerHTML = 'Подробная информация'
        mainDiv.id = item._id

        mainDivImages.src = `${api}/${item.image_taft[0].image_taft}`

        mainDivImg.classList.add('img')
        mainDiv.classList.add('carpet')
        button.classList.add('btn')

        mainDivImg.append(mainDivImages)
        button.append(link)
        mainDiv.append(mainDivImg, button)

        wrapper.append(mainDiv)
    }
}

let addInCart = (param) => {
    let sendObj = userNow

    if (!userNow.codeCarpets) sendObj.codeCarpets = param
    else sendObj.codeCarpets = userNow.codeCarpets + ', ' + param

    axios.patch(`${api}/users/${localStorage.user}`, sendObj)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => console.error(err))
}