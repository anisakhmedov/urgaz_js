let userId = localStorage.user
let user = {}
let userImg = document.querySelector('#profile-img')
let arrCarpets = []

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
            loadData(user)
        })
        .catch((err) => console.error(err))
}

getUser()

let loadData = (param) => {
    let form = document.querySelector('form')
    for (let item of document.querySelectorAll('input')) {
        for (let key in param) {
            if (key == item.getAttribute('name')) {
                item.setAttribute('value', param[key])
            }
        }
    }

    form.onsubmit = () => {
        event.preventDefault();
        let fm = new FormData(event.target);
        let obj = {}

        fm.forEach((val, key) => obj[key] = val)

        axios.patch(`${api}/users/${param._id}`, obj)
            .then((res) => getUser())
            .catch((err) => console.error(err))
    }
}

let updateUser = document.getElementById('saveNewUser')

updateUser.onclick = () => {
    let inpts = updateUser.parentNode.querySelectorAll('input')

    let obj = {}
    for (let item of inpts) {
        obj = {
            name: item.getAttribute('name') == 'name' ? item.value : user.name,
            surname: item.getAttribute('name') == 'surname' ? item.value : user.surname,
            email: item.getAttribute('name') == 'email' ? item.value : user.email,
            phone: item.getAttribute('name') == 'phone' ? item.value : user.phone,
            password: item.getAttribute('name') == 'password' ? item.value : user.password,
        }

        if (item.getAttribute('name') == 'new_password') {
            if (item.value != '') obj.password = item.value
            else obj.password = user.password
        }
    }

    axios.patch(`${api}/users/${user._id}`, obj)
        .then((res) => getUser())
        .catch((err) => console.error(err))
}

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
                <p class="code">Вес: <span>${val.item.weight}</span></p>
                <p class="color">Кол-во пучков: <span>${val.item.valuePuchok} m2</span></p>
                <p class="category">Ворс: <span>${val.item.vorse}</span></p>
                </div>
                </div>
                <div class="actions">
                <button class="showCarpet" onclick="openCarpet()">Посмотреть товар</button>
                <button onclick="removeCarpetUser()">Удалить</button>
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