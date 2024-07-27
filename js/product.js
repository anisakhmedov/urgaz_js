
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

if (window.innerWidth > 950) {
    widthArray = 5
} else if (window.innerWidth <= 950) {
    widthArray = 3
}

let arr = []
let obj = {}

let getCarpetsProd = async () => {
    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, num);
    }

    await axios.get(apiCarpets + 'carpets')
        .then((res) => {
            arr = res.data
            for (let item of arr) {
                item.image = []
                item.taft = []
                for (let ket of item.codes.split(', ')) {
                    item.image.push(`https://urgaz.s3.ap-northeast-1.amazonaws.com/Carpet/${item.title.toUpperCase()}/code/${ket}.jpg`)
                    item.taft.push(`https://urgaz.s3.ap-northeast-1.amazonaws.com/Carpet/${item.title.toUpperCase()}/taft/${ket}.jpg`)
                }
            }
            uploadCarpetArray(getMultipleRandom(arr, widthArray))
        })
        .catch((err) => console.error(err))

    await axios.get(apiCarpets + 'carpets/' + carpetIdPage)
        .then((res) => {
            for (let item of arr) {
                if (item._id == res.data._id) {
                    obj = item
                }
            }
            let info = document.querySelector('.info')

            let title = document.createElement('h2')
            title.innerHTML = obj.title
            let categories = document.createElement('p')
            categories.innerHTML = 'Категория: ' + obj.categories_ru
            let puchok = document.createElement('p')
            puchok.innerHTML = 'Количество пучков: ' + obj.valuePuchok
            let weight = document.createElement('p')
            weight.innerHTML = 'Вес: ' + obj.weight
            let vorse = document.createElement('p')
            vorse.innerHTML = 'Ворс: ' + obj.vorse
            let valueNow = document.createElement('p')
            let btn = document.createElement('button')
            btn.innerHTML = 'Добавить в избранное'

            let userNow = []

            axios.get(apiCarpets + 'users/' + localStorage.user)
                .then((res) => userNow = res.data)
                .catch((err) => console.error(err))

            btn.onclick = () => {
                let sendObj = userNow
                delete sendObj._id
                if (!userNow.codeCarpets) sendObj.codeCarpets = carpetCodeIdPage
                else sendObj.codeCarpets = userNow.codeCarpets + ', ' + carpetCodeIdPage

                let fm = new FormData();
                fm.append('codeCarpets', sendObj.codeCarpets)

                const updatedData = {
                    name: sendObj.name,
                    surname: sendObj.surname,
                    email: sendObj.email,
                    password: sendObj.password,
                    phone: sendObj.phone,
                    image: sendObj.image,
                    codeCarpets: sendObj.codeCarpets
                };

                axios.patch(`${apiCarpets}users/${localStorage.user}`, fm, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
            info.append(categories, title, valueNow, vorse, weight, puchok, btn)

            uploadCarpets(obj)
        })
        .catch((err) => {
            console.log(err);
        })
}
getCarpetsProd()

let mainCarp = document.querySelector('.main-carousel img')
let selectCarpet = document.querySelector('.thumbnails')

let uploadCarpets = (param) => {
    let c = param.image
    let v = param.taft
    for (let item of c) {
        let img = document.createElement('img')
        img.src = item
        selectCarpet.appendChild(img)

        img.onclick = () => {
            let code = item.split('/code/')[1].split('.')[0]

            if (window.location.href.includes('carpetID')) {
                window.location.href = window.location.href.replace(`carpetID=${carpetCodeIdPage}`, `carpetID=${code}`)
            } else {
                window.location.href = `product.html?id=${carpetIdPage}?carpetID=${code}#${usefullHash}`
            }
            for (let carpetTaft of v) {
                if (carpetTaft.toLowerCase().includes(code.toLowerCase())) {
                    mainCarp.src = carpetTaft
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
                    mainCarp.src = item
                }
            }
            for (let item of selectCarpet.children) {
                if (item.src.toLowerCase().includes(carpetCodeIdPage.toLowerCase())) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            }
        } else if (carpetCodeIdPage == undefined) {
            mainCarp.src = v[0]
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

        mainDivImages.src = item.taft[0]

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
        })
        .catch((err) => console.error(err))
}