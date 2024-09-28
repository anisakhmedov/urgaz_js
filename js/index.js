let find_filter = document.querySelector('#find-filter');
let objFilt = {
    vorse: [],
    categories: ''
}

for (let item of document.querySelector('#categories-filter').querySelectorAll('.item')) {
    item.onclick = () => {
        filArr = []
        for (let el of document.querySelector('#categories-filter').querySelectorAll('.item')) {
            el.classList.remove('active')
        }

        for (let par of arr) {
            if (par.categories_eng == event.target.getAttribute('name')) {
                filArr.push(par)
                showData(filArr)
            } else {
                wrapper.innerHTML = 'Ничего не найдено :('
            }
        }
    }
}

let filArr = []
for (let item of document.querySelector('#vors-filter').querySelectorAll('.item')) {
    item.onclick = () => {
        filArr = []
        for (let el of document.querySelector('#vors-filter').querySelectorAll('.item')) {
            el.classList.remove('active')
        }
        item.classList.add('active')

        for (let par of arr) {
            if (event.target.getAttribute('name') == 1 && par.vorse.includes('ПП') && !par.vorse.includes('ПП-ПЭ')) {
                filArr.push(par)
                showData(filArr)
            } else {
                if (event.target.getAttribute('name') == 2 && par.vorse.includes('ПЭ') && !par.vorse.includes('ПП-ПЭ')) {
                    filArr.push(par);
                    showData(filArr)
                } else {
                    if (event.target.getAttribute('name') == 3 && par.vorse.includes('ПП-ПЭ')) {
                        filArr.push(par);
                        showData(filArr)
                    }
                }
            }
        }
    }
}

for (let item of document.getElementById('type-filter').children) {
    item.onclick = () => {
        const someArr = arr
        filArr = []
        if (!item.querySelector('.check-box').querySelector('img').classList.contains('active')) {
            if (item.querySelector('.check-box').getAttribute('name') == 1) {
                for (let el of document.getElementById('type-filter').children) {
                    el.querySelector('.check-box').querySelector('img').classList.remove('active')
                }
                filArr = someArr.filter(val => val.valuePuchok >= 100000 && val.valuePuchok <= 200000)
                item.querySelector('.check-box').querySelector('img').classList.add('active')
                showData(filArr)
            } else if (item.querySelector('.check-box').getAttribute('name') == 2) {
                for (let el of document.getElementById('type-filter').children) {
                    el.querySelector('.check-box').querySelector('img').classList.remove('active')
                }
                filArr = someArr.filter(val => val.valuePuchok >= 200000 && val.valuePuchok <= 500000)
                item.querySelector('.check-box').querySelector('img').classList.add('active')
                showData(filArr)
            } else if (item.querySelector('.check-box').getAttribute('name') == 3) {
                for (let el of document.getElementById('type-filter').children) {
                    el.querySelector('.check-box').querySelector('img').classList.remove('active')
                }
                filArr = someArr.filter(val => val.valuePuchok >= 500000 && val.valuePuchok <= 1000000)
                item.querySelector('.check-box').querySelector('img').classList.add('active')
                showData(filArr)
            } else if (item.querySelector('.check-box').getAttribute('name') == 4) {
                for (let el of document.getElementById('type-filter').children) {
                    el.querySelector('.check-box').querySelector('img').classList.remove('active')
                }
                filArr = someArr.filter(val => val.valuePuchok > 1000000)
                item.querySelector('.check-box').querySelector('img').classList.add('active')
                showData(filArr)
            }
        } else {
            item.querySelector('.check-box').querySelector('img').classList.remove('active')
            showData(arr)
        }
    }
}

find_filter.addEventListener('click', () => {
});

let showFilter = document.querySelector('.open-filter')
let showFilterX = document.querySelector('.filter-x img')
let leftSide = document.querySelector('.left-side')

showFilterX.onclick = () => {
    if (!leftSide.classList.contains('active')) leftSide.classList.add('active')
    else leftSide.classList.remove('active')
}


showFilter.onclick = () => {
    if (!leftSide.classList.contains('active')) leftSide.classList.add('active')
    else leftSide.classList.remove('active')
}

let arr = []
let GetData = () => {
    axios.get(api + '/carpets')
        .then((res) => {
            arr = res.data
            for (let item of arr) {
                item.image = []
                item.taft = []
                for (let ket of item.codes.split(', ')) {
                    item.image.push(`https://urgaz.s3.ap-northeast-1.amazonaws.com/Carpet/${item.title.toUpperCase()}/code/${ket}.jpg`)
                    item.taft.push(`https://urgaz.s3.ap-northeast-1.amazonaws.com/Carpet/${item.title.toUpperCase()}/taft/${ket}.jpg`)
                }
            }
            showData(arr)
        })
        .catch((err) => console.error(err))
}
GetData()


let wrapper = document.querySelector('.wrapper')
let showData = (param) => {
    wrapper.innerHTML = ''
    for (let item of param) {
        let mainDiv = document.createElement('div')
        let mainDivImg = document.createElement('div')
        let mainDivImages = document.createElement('img')
        let mainDivImgTop = document.createElement('div')
        let mainDivImgTopShow = document.createElement('div')
        let mainDivImgTopShowImg = document.createElement('img')
        let mainDivImgStarShow = document.createElement('div')
        let mainDivImgStarShowImg = document.createElement('img')
        let mainDivImgBottom = document.createElement('div')
        let mainDivImgBottomText = document.createElement('p')

        let mainDivDisc = document.createElement('div')
        let mainDivDiscColorsText = document.createElement('p')
        let mainDivDiscColors = document.createElement('div')

        mainDivImages.src = item.taft[0]

        for (let imgCarpet of item.image) {
            let mainDivDiscColorsImages = document.createElement('img') // a lot of images
            mainDivDiscColorsImages.src = imgCarpet
            mainDivDiscColorsImages.onclick = () => {
                for (let taf of item.taft) {
                    if (taf.toUpperCase().includes(event.target.src.split('code/')[1].split('.')[0])) {
                        mainDivImages.src = taf
                    }
                }
            }
            mainDivDiscColors.append(mainDivDiscColorsImages)
        }
        let mainDivDiscDiscription = document.createElement('div')
        let mainDivDiscDiscriptionWeight = document.createElement('div')
        let mainDivDiscDiscriptionPuchok = document.createElement('div')
        let mainDivDiscDiscriptionVors = document.createElement('div')
        let mainDivDiscWeight = document.createElement('p')
        let mainDivDiscPuchok = document.createElement('p')
        let mainDivDiscVors = document.createElement('p')
        let mainDivDiscWeightSpan = document.createElement('span')
        let mainDivDiscPuchokSpan = document.createElement('span')
        let mainDivDiscVorsSpan = document.createElement('span')


        let button = document.createElement('button')
        let link = document.createElement('p')

        button.onclick = () => {
            window.location.href = `product.html?id=${item._id}#${usefullHash}`
        }

        mainDiv.id = item._id
        mainDivImgBottomText.innerHTML = item.title
        mainDivDiscVorsSpan.innerHTML = item.vorse
        mainDivDiscPuchokSpan.innerHTML = item.valuePuchok + ' m2'
        mainDivDiscWeightSpan.innerHTML = item.weight

        mainDivImgTopShowImg.src = '../assets/img/icons/eye.svg'
        mainDivImgStarShowImg.src = '../assets/img/icons/star-white.svg'

        link.classList.add('lang-carpet_more')
        mainDivDiscColorsText.classList.add('lang-carpet_colors')
        mainDivDiscVors.classList.add('lang-carpet_vorse')
        mainDivDiscWeight.classList.add('lang-carpet_weight')
        mainDivDiscPuchok.classList.add('lang-carpet_puchok')
        mainDivImages.classList.add('img-carpet')
        mainDivDiscDiscriptionWeight.classList.add('width')
        mainDivDiscDiscriptionPuchok.classList.add('height')
        mainDivDiscDiscription.classList.add('disc')
        mainDivDiscColors.classList.add('colors')
        mainDivDisc.classList.add('discription')
        mainDivImgBottom.classList.add('bottom')
        mainDivImgTopShow.classList.add('show')
        mainDivImgStarShow.classList.add('star')
        mainDivImgTop.classList.add('top')
        mainDivImg.classList.add('img')
        mainDiv.classList.add('carpet')
        button.classList.add('btn')


        mainDivDiscDiscriptionVors.append(mainDivDiscVors, mainDivDiscVorsSpan)
        mainDivDiscDiscriptionPuchok.append(mainDivDiscPuchok, mainDivDiscPuchokSpan)
        mainDivDiscDiscriptionWeight.append(mainDivDiscWeight, mainDivDiscWeightSpan)
        mainDivDiscDiscription.append(mainDivDiscDiscriptionWeight, mainDivDiscDiscriptionPuchok, mainDivDiscDiscriptionVors)
        mainDivDisc.append(mainDivDiscColorsText, mainDivDiscColors, mainDivDiscDiscription)
        mainDivImgBottom.append(mainDivImgBottomText)
        mainDivImgStarShow.append(mainDivImgStarShowImg)
        mainDivImgTopShow.append(mainDivImgTopShowImg)
        mainDivImgTop.append(mainDivImgTopShow, mainDivImgStarShow)
        mainDivImg.append(mainDivImages, mainDivImgTop, mainDivImgBottom)
        button.append(link)
        mainDiv.append(mainDivImg, mainDivDisc, button)

        wrapper.append(mainDiv)
        wrapper.append(mainDiv)
        wrapper.append(mainDiv)
        wrapper.append(mainDiv)

        mainDivImgStarShow.onclick = () => {
            let correceCarpet = event.target.parentNode.parentNode.parentNode.querySelector('.img-carpet').src.split('taft/')[1].split('.jpg')[0]
            if (!localStorage.user) {
                document.querySelector('.register-window').classList.add('active')
            } else {
                addInCart(correceCarpet)
            }
        }

        
        mainDivImgStarShowImg.onclick = () => {
            console.log('hi');
            
        }


        for (let langCarpet in lang) {
            for (let langItemCarpet of document.querySelectorAll('.lang-' + langCarpet)) {
                langItemCarpet.innerHTML = lang[langCarpet][hash]
                if (langItemCarpet.getAttribute('placeholder')) {
                    langItemCarpet.setAttribute('placeholder', lang[langCarpet][hash])
                }
            }
        }
    }
}

let userNow = []
let GetUser = () => {
    if (localStorage.user) {
        axios.get(api + '/users/' + localStorage.user)
            .then((res) => {
                userNow = res.data
            })
            .catch((err) => console.error(err))
    }
}
GetUser()


let addInCart = (param) => {
    let sendObj = userNow

    if (!userNow.codeCarpets) sendObj.codeCarpets = param
    else sendObj.codeCarpets = userNow.codeCarpets + ', ' + param

    axios.patch(`${api}/users/${localStorage.user}`, sendObj)
        .then((response) => {
        })
        .catch((err) => console.error(err))
}

let findCorrect = document.querySelector('.search')

findCorrect.onkeyup = () => {
    const query = event.target.value.toLowerCase().trim();

    const filteredCategories = arr.filter(item => item.title.toLowerCase().includes(query));

    if (event.target.value.toLowerCase().trim().length >= 1 && filteredCategories.length == 0) wrapper.innerHTML = "Ничего нет"
    else showData(filteredCategories)
}