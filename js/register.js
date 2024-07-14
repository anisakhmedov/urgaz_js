// const langArr = lang
// const allLang = ['en', 'uz', 'ru']

let allUsers = []
let api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com/users'

// if (localStorage.enter === 'true') {
//     window.location.href = window.location.href.replace('register.html', 'index.html')
//     localStorage.enter = 'true'
// } else {
//     localStorage.enter = false
// }

let getUsers = () => {
    axios.get(api)
        .then((response) => {
            allUsers = response.data
        })
        .catch((err) => {
            console.error(err);
        })
}
getUsers()

// let select = document.querySelector('select');
// let changeLanguage = () => {
//     let val = select.value
//     location.href = window.location.pathname + '#' + val
//     location.reload()
// }

// let chengedLanguage = () => {
//     let hash = window.location.hash
//     hash = hash.substring(1)
//     if (!allLang.includes(hash)) {
//         location.href = window.location.pathname + '#ru'
//         location.reload()
//     }
//     select.value = hash
//     for (let item in langArr) {
//         document.querySelector('.lang-' + item).innerHTML = langArr[item][hash]
//         if (document.querySelector('.lang-' + item).getAttribute('placeholder')) {
//             document.querySelector('.lang-' + item).setAttribute('placeholder', langArr[item][hash])
//         }
//     }
// }
// chengedLanguage()

// select.addEventListener('change', changeLanguage);


let regBtn = document.querySelector('#changeFormReg')
let entBtn = document.querySelector('#changeFormEnt')
let regForm = document.querySelector('.reg')
let entForm = document.querySelector('.ent')

regBtn.onclick = () => {
    regForm.classList.remove('active')
    entForm.classList.add('active')
}

entBtn.onclick = () => {
    regForm.classList.add('active')
    entForm.classList.remove('active')
}


regForm.onsubmit = () => {
    event.preventDefault()

    let fm = new FormData(event.target)
    let obj = {}

    fm.forEach((val, key) => {
        obj[key] = val
    })
    if (obj.password === obj.password2) {
        delete obj.password2
        for (let item of allUsers) {
            if (item.email.includes(obj.email)) {
                document.querySelector('#incorrect-email').classList.add('active')
                break
            } else if (!item.email.includes(obj.email) && item.phone.includes(obj.phone)) {
                document.querySelector('#incorrect-email').classList.remove('active')
                document.querySelector('#incorrect-phone').classList.add('active')
                break
                // console.log(item);
            } else if (!item.email.includes(obj.email) && !item.phone.includes(obj.phone)) {
                document.querySelector('#incorrect-phone').classList.remove('active')
                axios.post(api, obj)
                    .then((response) => {
                        localStorage.user = response.data._id
                        window.location.href = window.location.href.replace('register.html', 'index.html')
                        localStorage.enter = 'true'
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                break
            }
        }
    }
}

entForm.onsubmit = () => {
    event.preventDefault()

    let fm = new FormData(event.target)
    let obj = {}

    fm.forEach((val, key) => {
        obj[key] = val
    })

    for (let item of allUsers) {
        if (item.email == obj.email && item.password == obj.password) {
            document.getElementById('correct-email').classList.remove('active');
            document.getElementById('correct-password').classList.remove('active');
            window.location.href = window.location.href.replace('register.html', 'index.html')
            localStorage.enter = 'true'
            localStorage.user = item._id
        } else {
            if (item.email != obj.email) {
                document.getElementById('correct-email').classList.add('active');
                document.getElementById('correct-password').classList.remove('active');
            } else if (item.password != obj.password) {
                document.getElementById('correct-email').classList.remove('active');
                document.getElementById('correct-password').classList.add('active');
            }
        }
    }
}

