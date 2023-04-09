export default function init() {
    setTimeout(() => {
        const carousel = new Carousel()
    }, 300)
    
}

class Carousel {
    #_id;
    #_controllers;
    _currentItem = 1;
    #_lastItem = 4;
    _items = [];
    #_elements = {
        el: null,
        content: {
            el: null,
        },
        overlay: {
            el: null,
            controllers: {
                previous: null,
                next: null
            },
            content: {
                el: null,
                title: null,
                description: null,
                link: null
            },
            preview: {
                el: null,
                items: null
            }
        }
    }

    constructor() {
        this.#_id = 'carousel'

        this.#_controllers = {
            previous: {
                changeItem: () => this.changeItem(this._currentItem - 1) 
            },
            next: {
                changeItem: () => this.changeItem(this._currentItem + 1)
            }
        }

        this._items = [
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
        ]
        this.init()
        
    }

    set _currentItem(value) {
        this._currentItem = value
    }

    init() {
        this.#_elements.el = document.getElementById('carousel')
        this.#_elements.overlay.el = document.querySelector('.carousel-overlay')
        this.#_elements.overlay.content.el = document.querySelector('.carousel-content')
        this.#_elements.overlay.controllers.previous = document.getElementById(`carousel-overlay-controller-previous`)
        this.#_elements.overlay.controllers.next = document.getElementById(`carousel-overlay-controller-next`)
        this.#_elements.overlay.preview.items = document.getElementsByClassName(`carousel-overlay-preview-item`)
        this.#_elements.content.el = document.querySelector('.carousel-content')
        
        this.#_elements.el.addEventListener('mouseenter', () => this.#_elements.overlay.el.classList.add('carousel-overlay--hover'))
        this.#_elements.el.addEventListener('mouseleave', () => this.#_elements.overlay.el.classList.remove('carousel-overlay--hover'))

        this.#_elements.overlay.controllers.previous.addEventListener('click', () => {
            this.moveSlide('previous')
        })
        this.#_elements.overlay.controllers.next.addEventListener('click', () => {
            this.moveSlide('next')
        })

        Array.from(this.#_elements.overlay.preview.items).forEach((preview, index) => preview.addEventListener('click', () => {
            this.changeItem(index + 1)
        }))

        setInterval(() => {
            this.moveSlide('next')
        }, 5000)
        
        this.changeItemContent(1)
        
    }

    moveSlide(direction) {
        if (this._currentItem === 1 && direction === 'previous') return this.changeItem(this.#_lastItem)

        if (this._currentItem === this.#_lastItem && direction === 'next') return this.changeItem(1)

        this.#_controllers[direction].changeItem()
        
    }
    changeItem(item) {
        this.translateItem(item)
        this.changePreviewItem(item)
        this.changeItemContent(item)
        this._currentItem = item
    }

    changeItemContent(item) {
        const newContent = document.querySelector('#carousel-overlay-content-item').innerHTML
            
        document.querySelector('.carousel-overlay-content-item').innerHTML = newContent
            .replace('{{overlay-content-title}}', this._items[item - 1].title)
            .replace('{{overlay-content-description}}', this._items[item - 1].description)
            .replace('{{overlay-content-link}}', this._items[item - 1].link)
    }

    changePreviewItem(item) {
         this.#_elements.overlay.preview.items[this._currentItem - 1].classList.remove('active')
         this.#_elements.overlay.preview.items[item - 1].classList.add('active')
    }

    translateItem(item) {
        this.#_elements.content.el.style.transform = `translateX(calc(${-item + 1} * 25%))`
    }
}