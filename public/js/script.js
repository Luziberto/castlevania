const items = [
    {
        image: 'public/images/Grimoire_of_Souls_-_03.webp',
        title: 'Grimoire of Souls returns!',
        description: 'Now available on your favorite Apple device.',
        link: '#'
    },
    {
        image: 'public/images/Castlevania_Advance_Collection_-_03.webp',
        title: 'Castlevania Advance Collection',
        description: 'A new Castlevania compilation that includes the three GBA titles, as well as Dracula X.',
        link: '#'
    },
    {
        image: 'public/images/Season4PromoNetflix.PNG.webp',
        title: 'Castlevania Season 4',
        description: 'The new season of the animated series is now available on Netflix!',
        link: '#'
    },
    {
        image: 'public/images/Castlevania_-_Moonlight_Rhapsody_-_02.webp',
        title: 'Castlevania: Moonlight Rhapsody',
        description: 'The first Konami licensed Castlevania game for the Chinese mobile market.',
        link: '#'
    },
];

window.onload = () => {
    new Promise(async resolve => {
        await includeHtml('carousel-template')
        includeHtml('navbar')
        includeHtml('header')
        await includeHtml('main')
        resolve()
    }).then(() => {
        document.getElementById('carousel').carousel(items)
    })
}

async function includeHtml(id) {
    const el = document.getElementById(id)
    await fetch(`components/${el.getAttribute('include-html')}`)
        .then(res => res.text())
        .then(data => {
            el.innerHTML = data
        });
}