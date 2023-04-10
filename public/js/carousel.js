export class Carousel {
    #_root;
    #_controllers;
    _currentItem = 1;
    _items = [];
    #_elements = {
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

    constructor(root, items) {
        this.#_root = root
        this._items = items
        this.#_controllers = {
            previous: {
                changeItem: () => this.changeItem(this._currentItem - 1) 
            },
            next: {
                changeItem: () => this.changeItem(this._currentItem + 1)
            }
        }

        this._items = items
        this.init()
        
    }

    set _currentItem(value) {
        this._currentItem = value
    }

    async init() {
        await this.generateHtml()
        await this.setElements()
        await this.setEvents()
        
        this.#_root.classList.add('carousel')
        this.#_root.style.display = 'block'
        this.changeItemContent(1)
        
    }

    setElements() {
        this.#_elements.overlay.el = this.#_root.querySelector(`.carousel-overlay`)
        this.#_elements.overlay.content.el = this.#_root.querySelector(`.carousel-content`)
        this.#_elements.overlay.controllers.previous = this.#_root.querySelector(`.carousel-overlay-controller.carousel-overlay-controller-previous`)
        this.#_elements.overlay.controllers.next = this.#_root.querySelector(`.carousel-overlay-controller.carousel-overlay-controller-next`)
        this.#_elements.overlay.preview.items = this.#_root.querySelectorAll(`.carousel-overlay-preview-item`)
        this.#_elements.content.el = this.#_root.querySelector(`.carousel-content`)
    }
    
    setEvents() {
        this.#_root.addEventListener('mouseenter', () => this.#_elements.overlay.el.classList.add('carousel-overlay--hover'))
        this.#_root.addEventListener('mouseleave', () => this.#_elements.overlay.el.classList.remove('carousel-overlay--hover'))
        this.#_elements.overlay.controllers.previous.addEventListener('click', () => { this.moveSlide('previous') })
        this.#_elements.overlay.controllers.next.addEventListener('click', () => { this.moveSlide('next') })
        Array.from(this.#_elements.overlay.preview.items).forEach((preview, index) => preview.addEventListener('click', () => { this.changeItem(index + 1) }))
        setInterval(() => this.moveSlide('next'), 5000)
    }

    moveSlide(direction) {
        if (this._currentItem === 1 && direction === 'previous') return this.changeItem(this._items.length)

        if (this._currentItem === this._items.length && direction === 'next') return this.changeItem(1)

        this.#_controllers[direction].changeItem()
        
    }

    changeItem(item) {
        this.translateItem(item)
        this.changePreviewItem(item)
        this.changeItemContent(item)
        this._currentItem = item
    }

    generateHtml() {
        const template = document.getElementById('template-carousel').content.cloneNode(true)
        // template.querySelector('.carousel-content').innerHTML = document.getElementById('template-carousel-content-item').content.cloneNode(true)
        let content = ''
        let previewContent = ''
        const previewItemTemplate = document.getElementById('template-carousel-overlay-preview-item').innerHTML
        const contentitemTemplate = document.getElementById('template-carousel-content-item').innerHTML
        this._items.forEach((item, index) => {
            previewContent += previewItemTemplate.replace('{img_url}', item.image)
            content += contentitemTemplate.replace('{img_url}', item.image)
        })
        template.querySelector('.carousel-overlay-preview').innerHTML = previewContent
        template.querySelector('.carousel-content').innerHTML = content
        this.#_root.appendChild(template)
        
    }
    changeItemContent(item) {
        const newContent = document.getElementById('template-carousel-overlay-content-inner').innerHTML
            
        this.#_root.querySelector(`.carousel-overlay-content-inner`).innerHTML = newContent
            .replace('{title}', this._items[item - 1].title)
            .replace('{description}', this._items[item - 1].description)
            .replace('{link}', this._items[item - 1].link)
    }

    changePreviewItem(item) {
         this.#_elements.overlay.preview.items[this._currentItem - 1].classList.remove('active')
         this.#_elements.overlay.preview.items[item - 1].classList.add('active')
    }

    translateItem(item) {
        this.#_elements.content.el.style.transform = `translateX(calc(${-item + 1} * 100%))`
    }
}