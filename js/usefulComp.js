let header = document.querySelector('.header')
let footer = document.querySelector('.footer')
let menu_mob = document.querySelector('.menu-header')
let api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com'
let currentPage = window.location.href.split('/')[4]

let checkUserPage = () => {
    if (currentPage != undefined) {
        if (localStorage.enter === 'false' || !localStorage.enter) {
            if (!currentPage.includes('register')) {
                localStorage.enter = 'false'
                window.location.href = window.location.href.replace(currentPage, 'register.html')
            } else {

            }
        } else {
            if (currentPage.includes('register.html')) {
                localStorage.enter = 'true'
                window.location.href = window.location.href.replace('register.html', 'index.html')
            }
        }
    } else {
        window.location.href = './pages/register.html'
    }
}
checkUserPage()

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
                <a class="lang-menu_saved" href="./cart.html">
                    <p>Избранное</p>
                    <img src="../assets/img/icons/star.svg" alt="">
                </a>
                <a class="lang-menu_profile" href="./profile.html">
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
            <a href="./cart.html">
            <img src="../assets/img/icons/star.svg" alt="">
            </a>
            <div class="icon-lang">
                <img src="../assets/img/icons/language.svg" alt="">
                <div class="languages">
                    <div class="change-lan-lan ru">RUS</div>
                    <div class="change-lan-lan en">ENG</div>
                    <div class="change-lan-lan uz">UZB</div>
                </div>
            </div>
            <a href="profile.html">
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
            // location.reload()
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