let colors_choose = document.querySelector('#filter-colors');
let categories_choose = document.querySelector('#categories-filter');
let height_filter = document.querySelector('#height-filter');
let type_filter = document.querySelector('#type-filter');
let width_filter = document.querySelector('#width-filter');
let find_filter = document.querySelector('#find-filter');

let obj_search = {
    colors: [],
    categories: [],
    height: [],
    cotton: [],
    width: {
        from: 0,
        to: 0
    }
}

if (localStorage.enter === 'false' || !localStorage.enter) {
    window.location.href = window.location.href.replace('index.html', 'register.html')
    localStorage.enter = 'false'
} else {
    window.location.href = window.location.href.replace('register.html', 'index.html')
    localStorage.enter = 'true'
}

for (let item of colors_choose.children) {
    item.onclick = () => {
        obj_search.colors = [...new Set(obj_search.colors)]
        if (!item.getAttribute('class').includes('active')) {
            item.classList.add('active')
            obj_search.colors.push(+item.getAttribute('name'))
        } else {
            obj_search.colors = obj_search.colors.filter(el => el !== +item.getAttribute('name'))
            item.classList.remove('active')
        }
    }
}

for (let item of categories_choose.children) {
    item.onclick = () => {
        obj_search.categories = [...new Set(obj_search.categories)]
        if (!item.getAttribute('class').includes('active')) {
            item.classList.add('active')
            obj_search.categories.push(+item.getAttribute('name'))
        } else {
            obj_search.categories = obj_search.categories.filter(el => el !== +item.getAttribute('name'))
            item.classList.remove('active')
        }
    }
}

for (let item of height_filter.children) {
    item.onclick = () => {
        obj_search.height = [...new Set(obj_search.height)]
        if (!item.querySelector('img').getAttribute('class').includes('active')) {
            item.querySelector('img').classList.add('active')
            obj_search.height.push(+item.querySelector('.check-box').getAttribute('name'))
            console.log(obj_search);
        } else {
            obj_search.height = obj_search.height.filter(el => el !== +item.querySelector('.check-box').getAttribute('name'))
            item.querySelector('img').classList.remove('active')
        }
    }
}

for (let item of type_filter.children) {
    item.onclick = () => {
        obj_search.cotton = [...new Set(obj_search.cotton)]
        if (!item.querySelector('img').getAttribute('class').includes('active')) {
            item.querySelector('img').classList.add('active')
            obj_search.cotton.push(+item.querySelector('.check-box').getAttribute('name'))
        } else {
            obj_search.cotton = obj_search.cotton.filter(el => el !== +item.querySelector('.check-box').getAttribute('name'))
            item.querySelector('img').classList.remove('active')
        }
        console.log(obj_search);
    }
}

find_filter.addEventListener('click', () => {
    obj_search.width.from = width_filter.children[0].value
    obj_search.width.to = width_filter.children[1].value
});