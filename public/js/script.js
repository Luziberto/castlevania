import Carousel from './carousel.js'

window.onload = () => {
    new Promise(resolve => {
        includeHtml('navbar')
        includeHtml('header')
        includeHtml('main')
        resolve()
    }).then(() => {
        Carousel()
    })

    
}

function includeHtml(id) {
    const el = document.getElementById(id)
    fetch(`components/${el.getAttribute('include-html')}`)
        .then(res => res.text())
        .then(data => {
            el.innerHTML = data
        });
}