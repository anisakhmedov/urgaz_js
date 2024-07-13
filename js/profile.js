let api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com'
let userId = localStorage.user
let user = {}
let userImg = document.querySelector('img')

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

let updateUser = document.getElementById('updateUser')

updateUser.onsubmit = () => {
    event.preventDefault()
    let fm = new FormData(event.target)

    let obj = {}

    fm.forEach((val, key) => {
        obj[key] = val
    })

    if (obj.new_password !== '' && obj.new_password == obj.password) {
        
    }
    delete obj.new_password
}