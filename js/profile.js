let userId = localStorage.user
let user = {}
let userImg = document.querySelector('#profile-img')
let arrCarpets = []

let UploadCarpets = () => {
    axios.get(api + '/carpets')
        .then((res) => {
            arrCarpets = res.data
        })
        .catch((err) => console.error(err))
}
UploadCarpets()

let getUser = () => {
    axios.get(`${api}/users/${userId}`)
        .then((res) => {
            user = res.data
            userImg.style.backgroundImage = `url(${api}/${user.image})`
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
    // if (item.getAttribute('name') === key) item.value = param[key]

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

let changePhoto = document.querySelector('#uploadImage')
let inputImage = document.querySelector('#correctPhoto')
let saveImage = document.querySelector('#saveImage')

changePhoto.onclick = () => {
    inputImage.click()
}

inputImage.onchange = () => {
    let imgPath = event.target.files[0]
    if (inputImage.value != '') {
        saveImage.removeAttribute('disabled')
        saveImage.onclick = () => {
            uploadNewImage(imgPath)
        }
    }
}

let uploadNewImage = (param) => {
    // console.log(param);
    let fm = new FormData()
    fm.append('image', param)
    // user.image = param
    // console.log(param);
    // console.log(user);
    axios.patch(`${api}/users/${user._id}`, fm, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            console.log(response);
            location.reload()
        })
        .catch((err) => {
            console.error(err);
        })
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
                if (carpet == imageCarpet.image_carpet.split('-')[1].split('.')[0]) {
                    correctCarpet.push(imageCarpet.image_carpet)
                }
            }
            for (let imageTaft of item.image_taft) {
                if (carpet == imageTaft.image_taft.split('-')[1].split('.')[0]) {
                    correctTaft.push(imageTaft.image_taft)
                }
            }
        }
    }

    let items = document.querySelector('.items')
    items.innerHTML = ''
    for (let val of correctTaft) {
        let div = document.createElement('div')
        div.classList.add('item')
        for (let item of arr) {
            div.id = item._id
            div.innerHTML = `
            <img src="${api}/${val}" alt="">
            <div class="text">
                <h2>${item.title}</h2>
                <p class="code">Вес: <span>${item.weight}</span></p>
                <p class="color">Кол-во пучков: <span>${item.valuePuchok}</span></p>
                <p class="category">Ворс: <span>${item.vorse}</span></p>
                <div class="actions">
                    <button class="showCarpet">Посмотреть товар</button>
                    <p onclick="removeCarpetUser()">Удалить</p>
                </div>
            </div>
            `
        }
        items.append(div)
    }
}

let removeCarpetUser = () => {
    let removeCarpet = event.target.parentNode.parentNode.parentNode.querySelector('img').src.split('-')[3].split('.')[0]

    let objRemove = user.codeCarpets.replace(removeCarpet, '')

    if (objRemove[0] == ',') objRemove = objRemove.replace(', ', '')

    user.codeCarpets = objRemove

    axios.patch(`${api}/users/${localStorage.user}`, user)
        .then((res) => {
            console.log(res);
            showCart()
        })
        .catch((err) => console.error(err))
}