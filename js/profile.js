let api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com'
let userId = localStorage.user
let user = {}
let userImg = document.querySelector('#profile-img')

let getUser = () => {
    axios.get(`${api}/users/${userId}`)
        .then((res) => {
            user = res.data
            userImg.src = `${api}/${user.image}`
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



// let changeLang = document.querySelector('.icon-lang')
// let addLang = document.querySelector('.languages')

// for (let item of addLang.children) {
//     console.log(item.getAttribute('class'));
//     item.onclick = () => {
//         let val = item.getAttribute('class')
//         location.href = window.location.pathname + '#' + val
//         location.reload()
//     }
// }
// const allLang = ['en', 'uz', 'ru']

// let changeLangFunc = () => {
//     let hash = window.location.hash
//     hash = hash.substring(1)
//     if (!allLang.includes(hash)) {
//         location.href = window.location.pathname + '#ru'
//         location.reload()
//     }
//     // select.value = hash
//     for (let item in profileLang) {
//         if (document.querySelector('.lang-' + item).getAttribute('placeholder')) {
//             document.querySelector('.lang-' + item).setAttribute('placeholder', profileLang[item][hash])
//         } else{
//             document.querySelector('.lang-' + item).innerHTML = profileLang[item][hash]
//         }
//     }
//     console.log(hash);
//     localStorage.lang = hash
// }

// changeLangFunc()

