let header = document.querySelector('.header')
let footer = document.querySelector('.footer')

// let currentPage = window.location.href.split('/')[4]
// if (localStorage.enter === 'false' || !localStorage.enter) {
//     window.location.href = window.location.href.replace(currentPage, 'register.html')
//     localStorage.enter = 'false'
// } else {
//     window.location.href = window.location.href.replace('register.html', 'index.html')
//     localStorage.enter = 'true'
// }

header.innerHTML = `
<div class="logo">
            <img src="../assets/img/logo/LOGO.png" alt="">
        </div>
        <nav class="nav-text">
            <a href="https://www.urgaz.com/">
                Главная
            </a>
            <a href="https://www.urgaz.com/about-us">О нас</a>
            <a href="https://www.urgaz.com/career">Карьера</a>
            <a href="https://www.urgaz.com/contact-us">Контакты</a>
        </nav>
        <nav class="nav-icons">
            <img src="../assets/img/icons/star.svg" alt="">
            <img src="../assets/img/icons/language.svg" alt="">
            <a href="profile.html"> 
                <img src="../assets/img/icons/contact.svg" alt="">
            </a>
        </nav>
`

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
                    <label for="">Компания</label>
                    <li>
                        <a href="https://www.urgaz.com/about-us">О нас</a>
                    </li>
                    <li>
                        <a href="https://www.urgaz.com/contact-us">Контакты</a>
                    </li>
                    <li>
                        <a href="/profile.html">Мой профиль</a>
                    </li>
                    <li>
                        <a href="/liked">Избранное</a>
                    </li>
                </ul>
            </div>
            <div class="catalogue">
                <ul>
                    <label for="">Каталог</label>
                    <li>
                        <a href="/">Каталог</a>
                    </li>
                    <li>
                        <a href="/">Каталог</a>
                    </li>
                    <li>
                        <a href="/">Каталог</a>
                    </li>
                    <li>
                        <a href="/">Каталог</a>
                    </li>
                </ul>
            </div>
            <div class="rooms">
                <ul>
                    <label for="">Комнаты</label>
                    <li>
                        <a href="/room">Комнаты</a>
                    </li>
                    <li>
                        <a href="/room">Комнаты</a>
                    </li>
                    <li>
                        <a href="/room">Комнаты</a>
                    </li>
                    <li>
                        <a href="/room">Комнаты</a>
                    </li>
                </ul>
            </div>
            <div class="contacts">
                <ul>
                    <label for="">Комнаты</label>
                    <li>
                        <p>Самарканд</p>
                        <p>Ургут Каратепа, Узбекистан</p>
                    </li>
                    <li>
                        <a href="tel:+998990560000">Телефон: +998990560000</a>
                    </li>
                    <li>
                        <a href="mailhref:info@urgaz.com">Эл. адрес: info@urgaz.com</a>
                    </li>
                </ul>
            </div>
        </nav>`

let db = [
    {
        title: 'title14',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title21',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title34',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title41',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title51',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title66',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title73',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title83',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title91',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title150',
        colors: ['red', 'green', 'blue']
    },
    {
        title: 'title111',
        colors: ['red', 'green', 'blue'],
    }
]

let btn = document.getElementById('showMore');
let numCut = 6
let showData = db.splice(0, numCut)

if (document.querySelector('.wrapper')) {
    let wrapper = document.querySelector('.wrapper')

    let uploadData = () => {
        for (let item of showData) {
            item.id = Math.random().toString().slice(2, 4)
            let mainItem = document.createElement('div');

            mainItem.innerHTML = `<div class="carpet" id="${item.id}">
        <div class="img">
        <img src="../assets/img/test.jpg" alt="">
        <div class="top">
        <div class="show">
        <img src="../assets/img/icons/eye.svg" alt="">
        </div>
        <div class="star">
        <img src="../assets/img/icons/star-white.svg" alt="">
        </div>
        </div>
        <div class="bottom">
        <p>${item.title}</p>
        </div>
        </div>
        <div class="discription">
        <p>Доступные цвета</p>
        <div class="colors">
        
        </div>
        <div class="disc">
        <div class="width">
        <p>Ширина</p>
        <span>4 метра</span>
        </div>
        <div class="height">
        <p>Общая высота</p>
        <span>7,8 мм</span>
        </div>
        </div>
        </div>
        <div class="btn">
        <a href="/">
        Подробная информация
        </a>
        </div>
        </div>`

            wrapper.append(mainItem)
        }
    }
    uploadData()
    btn.onclick = () => {
        numCut += numCut
        showData = db.splice(0, numCut)
        uploadData()
        if (numCut >= showData.length) {
            btn.style.display = 'none'
        }
    }
}