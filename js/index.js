let find_filter = document.querySelector('#find-filter');

find_filter.addEventListener('click', () => {
    obj_search.width.from = width_filter.children[0].value
    obj_search.width.to = width_filter.children[1].value
});

let showFilter = document.querySelector('.open-filter')
let leftSide = document.querySelector('.left-side')

showFilter.onclick = () => {
    if (!leftSide.classList.contains('active')) leftSide.classList.add('active')
    else leftSide.classList.remove('active')
}

let arr = []
let GetData = () => {
    axios.get(api + '/carpets')
        .then((res) => {
            arr = res.data
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

        for (let imgCarpet of item.image_carpet) {
            let mainDivDiscColorsImages = document.createElement('img') // a lot of images
            mainDivDiscColorsImages.src = `${api}/${imgCarpet.image_carpet}`
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
            // console.log(usefullHash);
             window.location.href = `product.html?id=${item._id}#${usefullHash}`
        }

        link.innerHTML = 'Подробная информация'
        mainDiv.id = item._id
        mainDivImgBottomText.innerHTML = item.title
        mainDivDiscColorsText.innerHTML = 'Доступные цвета'
        mainDivDiscVors.innerHTML = 'Ворс'
        mainDivDiscWeight.innerHTML = 'Ширина'
        mainDivDiscPuchok.innerHTML = 'Кол-во пучков'
        mainDivDiscVorsSpan.innerHTML = item.vorse
        mainDivDiscPuchokSpan.innerHTML = item.valuePuchok
        mainDivDiscWeightSpan.innerHTML = item.weight

        mainDivImgTopShowImg.src = '../assets/img/icons/eye.svg'
        mainDivImgStarShowImg.src = '../assets/img/icons/star-white.svg'
        mainDivImages.src = `${api}/${item.image_taft[0].image_taft}`

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
            let correceCarpet = item.image_taft[0].image_taft.split('-')[1].split('.')[0]
            addInCart(correceCarpet)

            // console.log(item.image_taft[0].image_taft.split('-')[1].split('.')[0]);
            // console.log(item.image_carpet[0].image_carpet.split('-')[1].split('.')[0]);
        }
    }
}

let userNow = []
let GetUser = () => {
    axios.get(api + '/users/' + localStorage.user)
        .then((res) => {
            userNow = res.data
            console.log(userNow);
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
            console.log(response);
        })
        .catch((err) => console.error(err))
}