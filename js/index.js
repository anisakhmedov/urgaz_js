let find_filter = document.querySelector('#find-filter');

find_filter.addEventListener('click', () => {
    obj_search.width.from = width_filter.children[0].value
    obj_search.width.to = width_filter.children[1].value
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
                    if(taf.toUpperCase().includes(event.target.src.split('code/')[1].split('.')[0])){
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
        mainDivDiscPuchokSpan.innerHTML = item.valuePuchok
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
            addInCart(correceCarpet)
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
    axios.get(api + '/users/' + localStorage.user)
        .then((res) => {
            userNow = res.data
        })
        .catch((err) => console.error(err))
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