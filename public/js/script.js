import Carousel from './carousel.js'

window.onload = () => {
    new Promise(resolve => {
        includeHtml('navbar')
        includeHtml('header')
        includeHtml('main')
        resolve()
    }).then(() => {
        setTimeout(() => {
            includeHtml('carousel')
            Carousel()
        }, 500)
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