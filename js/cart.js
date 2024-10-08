let userId = localStorage.user
let user = {}
let arrCarpets = []

if(hash == 'ru'){
    document.querySelector('.lang-inSaved').innerHTML = 'В избранном'
} else if(hash == 'en'){
    document.querySelector('.lang-inSaved').innerHTML = 'In favorites'
} else if(hash == 'uz'){
    document.querySelector('.lang-inSaved').innerHTML = 'Sevimlilar'
}

let UploadCarpets = () => {
    axios.get(api + '/carpets')
        .then((res) => {
            arrCarpets = res.data
            for (let item of arrCarpets) {
                item.image = []
                item.taft = []
                for (let ket of item.codes.split(', ')) {
                    item.image.push(`https://urgaz.s3.ap-northeast-1.amazonaws.com/Carpet/${item.title.toUpperCase()}/code/${ket}.jpg`)
                    item.taft.push(`https://urgaz.s3.ap-northeast-1.amazonaws.com/Carpet/${item.title.toUpperCase()}/taft/${ket}.jpg`)
                }
            }
        })
        .catch((err) => console.error(err))
}
UploadCarpets()

let getUser = () => {
    axios.get(`${api}/users/${userId}`)
        .then((res) => {
            user = res.data
        })
        .catch((err) => console.error(err))
}

getUser()

let showCart = () => {
    axios.get(`${api}/users/${localStorage.user}`)
        .then((res) => {
            carpet = res.data.codeCarpets
            loadCarpet(carpet)
        })
        .catch((err) => console.error(err))

}

showCart()

let loadCarpet = (param) => {
    let correctCarpet = []
    let correctTaft = []
    for (let item of arrCarpets) {
        for (let img of item.codes.split(', ')) {
            for (let key of param.split(", ")) {
                if (img == key) {
                    for (let some of item.image) {
                        if (some.toString().toLowerCase().includes(img.toString().toLowerCase())) {
                            correctCarpet.push({ 'item': item, codes: some })
                        }
                    }
                }
            }
        }
    }

    let items = document.querySelector('.items')
    items.innerHTML = ''
    if (correctCarpet.length != 0) {
        for (let val of correctCarpet) {
            let div = document.createElement('div')
            div.classList.add('item')
            div.id = val.item._id
            div.innerHTML = `
                <div class="top">
                <img src="${val.codes}" alt="">
                <div class="text">
                <h2>${val.item.title}</h2>
                <p class="code">${hash == 'ru' ? 'Вес' : hash == 'en' ? 'Weight' : "Og'irligi"}: <span>${val.item.weight}</span></p>
                <p class="color">${hash == 'ru' ? 'Кол-во пучков' : hash == 'en' ? 'Number of bundles' : "To'plamlar soni"}: <span>${val.item.valuePuchok}</span></p>
                <p class="category">${hash == 'ru' ? 'Ворс' : hash == 'en' ? 'Pile' : "Qopqoq"}: <span>${val.item.vorse}</span></p>
                </div>
                </div>
                <div class="actions">
                <button class="showCarpet" onclick="openCarpet()">${hash == 'ru' ? 'Посмотреть товар' : hash == 'en' ? 'View the product' : "Mahsulotni ko'ring"}</button>
                <button onclick="removeCarpetUser()">${hash == 'ru' ? 'Удалить' : hash == 'en' ? 'Remove' : "O'chirish"}</button>
                </div>
                `
            items.append(div)
        }
    } else if (correctCarpet.size == 0) {
        items.innerHTML = 'В избранном ничего нет'
    }
}

let removeCarpetUser = () => {
    let removeCarpet = event.target.parentNode.parentNode.querySelector('img').src.split('code/')[1].split('.')[0]
    let specArr = user.codeCarpets.split(', ')
    specArr = specArr.filter(item => item != removeCarpet);
    let str = ''
    for (let item of specArr) str += ', ' + item
    str = str.replace(', ', '')

    user.codeCarpets = str
    axios.patch(`${api}/users/${localStorage.user}`, user)
        .then((res) => {
            showCart()
        })
        .catch((err) => console.error(err))
}

let openCarpet = (param) => {
    let item = event.target.parentNode.parentNode.querySelector('img').src.split('code/')[1].split('.')[0]
    let idPageCarp = event.target.parentNode.parentNode.id

    window.location.href = `product.html?id=${idPageCarp}?carpetID=${item}#${usefullHash}`

}