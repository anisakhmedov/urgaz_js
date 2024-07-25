let userId = localStorage.user
let user = {}
let arrCarpets = []

let UploadCarpets = () => {
    axios.get(api + '/carpets')
        .then((res) => {
            arrCarpets = res.data
        })
        .catch((err) => console.error(err))
}
UploadCarpets()

let showCart = () => {
    axios.get(`${api}/users/${localStorage.user}`)
        .then((res) => {
            user = res.data
            carpet = res.data.codeCarpets
            console.log(new Set(carpet.split(', ')));
            loadCarpet(new Set(carpet.split(', ')), arrCarpets)
        })
        .catch((err) => console.error(err))

}

showCart()


let loadCarpet = (param, arr) => {
    let correctCarpet = []
    let correctTaft = []
    for (let carpet of param) {
        for (let item of arrCarpets) {
            for (let imageCarpet of item.image_carpet) {
                if (carpet.toLowerCase() == imageCarpet.image_carpet.split('-')[1].split('.')[0].toLowerCase()) {
                    correctCarpet.push(imageCarpet.image_carpet)
                }
            }
            for (let imageTaft of item.image_taft) {
                if (carpet.toLowerCase() == imageTaft.image_taft.split('-')[1].split('.')[0].toLowerCase()) {
                    correctTaft.push(imageTaft.image_taft)
                }
            }
        }
    }

    correctTaft = new Set(correctTaft)
    correctCarpet = new Set(correctCarpet)

    let items = document.querySelector('.items')
    console.log(correctCarpet.size);
    items.innerHTML = ''
    if (correctCarpet.size != 0) {
        for (let val of correctCarpet) {
            let div = document.createElement('div')
            div.classList.add('item')
            for (let item of arr) {
                div.id = item._id
                div.innerHTML = `
                <div class="top">
                <img src="${api}/${val}" alt="">
                <div class="text">
                <h2>${item.title}</h2>
                <p class="code">Вес: <span>${item.weight}</span></p>
                <p class="color">Кол-во пучков: <span>${item.valuePuchok}</span></p>
                <p class="category">Ворс: <span>${item.vorse}</span></p>
                </div>
                </div>
                <div class="actions">
                <button class="showCarpet" onclick="openCarpet()">Посмотреть товар</button>
                <button onclick="removeCarpetUser()">Удалить</button>
                </div>
                `
            }
            items.append(div)
        }
    } else if (correctCarpet.size == 0) {
        console.log('no one');
        items.innerHTML = 'В избранном ничего нет'
    }
}

let removeCarpetUser = () => {
    let removeCarpet = event.target.parentNode.parentNode.parentNode.querySelector('img').src.split('-')[3].split('.')[0]

    let objRemove = user.codeCarpets.replace(removeCarpet, '')

    if (objRemove[0] == ',') objRemove = objRemove.replace(', ', '')
    // objRemove = objRemove.split(',').filter(item => item.length > 2)

    user.codeCarpets = objRemove

    console.log(user.codeCarpets);
    axios.patch(`${api}/users/${localStorage.user}`, user)
        .then((res) => {
            console.log(res);
            showCart()
        })
        .catch((err) => console.error(err))
}

let openCarpet = (param) => {
    let item = event.target.parentNode.parentNode.querySelector('img').src.split('-')[3].split('.')[0]
    console.log(event.target.parentNode.parentNode);
    let idPageCarp = event.target.parentNode.parentNode.id

    window.location.href = `product.html?id=${idPageCarp}?carpetID=${item}#${usefullHash}`

}