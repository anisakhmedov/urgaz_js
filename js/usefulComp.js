let header = document.querySelector('.header')
let footer = document.querySelector('.footer')
let registerWindow = document.querySelector('.register-window')
let menu_mob = document.querySelector('.menu-header')
let api = 'http://localhost:3000'
let currentPage = window.location.href.split('/')[4]


if (registerWindow) {
    registerWindow.innerHTML = `
       
    <div class="bg-reg"></div>
        <div class="main">
        <form action="" class="reg active">
            <h1 class="lang-title-reg"></h1>
            <input required type="text" class="lang-name" placeholder="name" name="name">
            <input required type="text" class="lang-surname" placeholder="surname" name="surname">
            <input required type="text" class="lang-email" placeholder="email" name="email">
            <label class="lang-incorect-email correct" id="incorrect-email"></label>
            <input required type="text" class="lang-phone" placeholder="phone" name="phone">
            <label class="lang-incorect-phone correct" id="incorrect-phone">!</label>
            <input required type="text" class="lang-password" placeholder="password" name="password">
            <input required type="text" class="lang-access" placeholder="Подтверждение пароля" name="password2">
            <button class="lang-send"></button>
            <p id="changeFormReg" class="lang-already"></p>
        </form>
        <form action="" class="ent">
            <h1 class="lang-title-ent"></h1>
            <input type="text" class="lang-email-ent" placeholder="email" name="email">
            <label class="lang-correct-email correct" id="correct-email"></label>
            <input type="text" class="lang-password-ent" placeholder="password" name="password">
            <label class="lang-correct-password correct" id="correct-password"></label>
            <button class="lang-send-ent"></button>
            <p id="changeFormEnt" class="lang-regNow"></p>
        </form>
    </div>
    `
}

let allUsers = []

let getUsers = () => {
    axios.get(api + '/users')
        .then((response) => {
            allUsers = response.data
        })
        .catch((err) => {
            console.error(err);
        })
}
getUsers()

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
            } else if (!item.email.includes(obj.email) && !item.phone.includes(obj.phone)) {
                document.querySelector('#incorrect-phone').classList.remove('active')
                axios.post(api + '/users', obj)
                    .then((response) => {
                        localStorage.user = response.data._id
                        window.location.reload()
                        // window.location.href = window.location.href.replace('register.html', 'index.html')
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
            // window.location.href = window.location.href.replace('register.html', 'index.html')
            window.location.reload()
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

let checkUserPage = () => {
    if (currentPage != undefined) {
        if (localStorage.enter === 'false' || !localStorage.enter) {
            document.querySelector('.register-window').classList.add('active')
        }
    } else {
        window.location.href = window.location.href.replace('register.html', 'index.html')
        // window.location.href = './pages/register.html'
    }
}
// checkUserPage()

let getForLoad = () => {
    axios.get(api + '/carpets')
        .then((res) => {
            let arr = []
            arr = res.data
            for (let item of arr) {
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
getForLoad()

let useArrLang = usefullLang
let correctArray;
let hash = window.location.hash

if (currentPage != undefined) {
    if (currentPage.includes('profile')) correctArray = profileLang
    else if (currentPage.includes('register')) correctArray = registerLang
}
let usefullHash = hash.slice(1)

if (menu_mob) {
    menu_mob.innerHTML = `<nav class="nav-text">
                <a class="lang-menu_main" href="./index.html">
                    Главная
                </a>
                <a class="lang-menu_about_us" href="https://www.urgaz.com/about-us">
                    О нас
                </a>
                <a class="lang-menu_career" href="https://www.urgaz.com/career">
                    Карьера
                </a>
                <a class="lang-menu_contacts" href="https://www.urgaz.com/contact-us">
                    Контакты
                </a>
                <a class="lang-menu_saved" onclick=checkReg()>
                    <p>Избранное</p>
                    <img src="../assets/img/icons/star.svg" alt="">
                </a>
                <a class="lang-menu_profile" onclick=checkReg()>
                    <p>Профиль</p>
                    <img src="../assets/img/icons/contact.svg" alt="">
                </a>
                <a class="lang-menu_exit" onclick="backReload()" href="#">
                    <p>Выйти</p>
                </a>
                <div class="languages">
                    <div class="change-lan-lan ru">RUS</div>
                    <div class="change-lan-lan en">ENG</div>
                    <div class="change-lan-lan uz">UZB</div>
                </div>
            </nav>`
}

let backReload = () => {
    localStorage.clear()
    // window.location.href = ''
    checkUserPage()
}

if (header) {
    header.innerHTML = `
<div class="logo">
            <a href="index.html">
                <img src="../assets/img/logo/LOGO.png" alt="">
            </a>
        </div>
        <nav class="nav-text">
            <a href="./index.html">
                ${useArrLang.main_header[usefullHash]}
            </a>
            <a href="https://www.urgaz.com/about-us">
                ${useArrLang.about_us_header[usefullHash]}
            </a>
            <a href="https://www.urgaz.com/career">
                ${useArrLang.career_header[usefullHash]}
            </a>
            <a href="https://www.urgaz.com/contact-us">
                ${useArrLang.contacts_header[usefullHash]}
            </a>
        </nav>
        <nav class="nav-icons">
            <p onclick=checkReg()>
                <img src="../assets/img/icons/star.svg" alt="">
            </p>
            <div class="icon-lang">
                <img src="../assets/img/icons/language.svg" alt="">
                <div class="languages">
                    <div class="change-lan-lan ru">RUS</div>
                    <div class="change-lan-lan en">ENG</div>
                    <div class="change-lan-lan uz">UZB</div>
                </div>
            </div>
            <a onclick=checkReg()>
                <img src="../assets/img/icons/contact.svg" alt="">
            </a>
        </nav>
        <div class="menu">
            <img src="../assets/img/icons/main-menu.svg">
        </div>
`
}

if (footer) {
    footer.innerHTML = `<div class="logo-back">
            <img src="../assets/img/logo/back-footer.png" alt="">
            <img src="../assets/img/logo/back-footer.png" alt="">
        </div>
        <nav>
            <div class="logo">
                <img src="../assets/img/logo/white-logo.png" alt="">
            </div>
            <div class="company">
                <ul>
                    <label for="">
                        ${useArrLang.company_footer[hash.slice(1)]}
                    </label>
                    <li>
                        <a href="https://www.urgaz.com/about-us">
                            ${useArrLang.about_us_footer[hash.slice(1)]}
                        </a>
                        </li>
                        <li>
                        <a href="https://www.urgaz.com/contact-us">
                            ${useArrLang.contacts_footer[hash.slice(1)]}
                        </a>
                    </li>
                    <li>
                        <a href="/profile.html">
                            ${useArrLang.my_profile_footer[hash.slice(1)]}
                        </a>
                    </li>
                    <li>
                        <a href="/liked">
                            ${useArrLang.save_footer[hash.slice(1)]}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="contacts">
                <ul>
                    <label for="">
                        ${useArrLang.call_footer[hash.slice(1)]}
                    </label>
                    <li>
                        <p>
                            ${useArrLang.sam_footer[hash.slice(1)]}
                        </p>
                        <p>
                            ${useArrLang.streets_footer[hash.slice(1)]}
                        </p>
                    </li>
                    <li>
                        <a href="tel:+998990560000">
                            ${useArrLang.phone_footer[hash.slice(1)]}
                            +998990560000
                        </a>
                    </li>
                    <li>
                        <a href="mailto:info@urgaz.com">
                            ${useArrLang.mails_footer[hash.slice(1)]}
                            info@urgaz.com
                        </a>
                    </li>
                </ul>
            </div>
        </nav>`
}

let changeLang = document.querySelector('.icon-lang')
let addLang = document.querySelectorAll('.change-lan-lan')

if (addLang != null) {
    for (let item of addLang) {
        item.onclick = () => {
            let val = item.getAttribute('class').split(' ')[1]
            if (location.href.includes('id')) {
                let productIdNow = window.location.href.split('?')[1].split('#')[0]
                location.href = `${window.location.pathname}?${productIdNow}#${val}`
            } else {
                location.href = window.location.pathname + '#' + val
            }
            location.reload()
        }
    }
} else {
}
const allLang = ['en', 'uz', 'ru']


let changeLangFunc = () => {
    hash = hash.substring(1)
    if (!allLang.includes(hash)) {

        if (!localStorage.lang) location.href = window.location.pathname + '#ru'
        else if (localStorage.lang) location.href = window.location.pathname + '#' + localStorage.lang
        location.reload()
    }


    for (let item in correctArray) {
        if (document.querySelector('.lang-' + item).getAttribute('placeholder')) {
            document.querySelector('.lang-' + item).setAttribute('placeholder', correctArray[item][hash])
        } else {
            document.querySelector('.lang-' + item).innerHTML = correctArray[item][hash]
        }
    }
    for (let item in usefullLang) {
        if (document.querySelector('.lang-' + item)) {
            document.querySelector('.lang-' + item).innerHTML = usefullLang[item][hash]
        }
    }
    localStorage.lang = hash
}

changeLangFunc()

if (changeLang != null) {
    changeLang.onclick = () => {
        if (document.querySelector('.languages').className.includes('active')) {
            document.querySelector('.languages').classList.remove('active')
        } else {
            document.querySelector('.languages').classList.add('active')
        }
    }
}

let menu = document.querySelector('.menu')

if (menu != undefined) {
    menu.onclick = () => {
        let menu_act = document.querySelector('.menu-header')
        if (menu_act.classList.contains('active')) {
            menu_act.classList.remove('active')
            document.body.style.overflow = 'scroll'
        } else {
            document.body.style.overflow = 'hidden'
            menu_act.classList.add('active')
        }
    }
}

let removeRegForm = document.querySelector('.bg-reg')

removeRegForm.onclick = () => {
    document.querySelector('.register-window').classList.remove('active')
}

let checkReg = () => {
    if (!localStorage.user) {
        document.querySelector('.register-window').classList.add('active')
    }
    
}