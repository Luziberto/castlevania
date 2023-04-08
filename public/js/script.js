window.onload = () => {
    includeHtml('navbar')
    includeHtml('header')
    includeHtml('main')
}

function includeHtml(id) {
    const el = document.getElementById(id)
    fetch(`components/${el.getAttribute('include-html')}`)
        .then(res => res.text())
        .then(data => {
            el.innerHTML = data
        });
}