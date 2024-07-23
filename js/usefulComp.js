let header = document.querySelector('.header')
let footer = document.querySelector('.footer')
let api = 'https://urgaz-basedate-64ecc72d32d4.herokuapp.com'
let currentPage = window.location.href.split('/')[4]

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

let useArrLang = usefullLang
let correctArray;
let hash = window.location.hash

if (currentPage != undefined) {
    if (currentPage.includes('profile')) correctArray = profileLang
    else if (currentPage.includes('register')) correctArray = registerLang
}
let usefullHash = hash.slice(1)

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
            <img src="../assets/img/icons/star.svg" alt="">
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
                        <a href="mailhref:info@urgaz.com">
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
            console.log(item);
            let val = item.getAttribute('class').split(' ')[1]
            if (location.href.includes('id')) {
                let productIdNow = window.location.href.split('?')[1].split('#')[0]
                location.href = `${window.location.pathname}?${productIdNow}#${val}`
            } else{
                location.href = window.location.pathname + '#' + val
            }
            location.reload()
        }
    }
} else {
    console.log(addLang);
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