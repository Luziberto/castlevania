export default function init() {
    setTimeout(() => {
        const carousel = new Carousel()
        
        document.getElementById('carousel').addEventListener('mouseenter', carousel.showOverlay)
        document.getElementById('carousel').addEventListener('mouseleave', carousel.hideOverlay)

        document.getElementById(`carousel-overlay-controller-previous`).addEventListener('click', () => {
            carousel.moveItem('previous')
        })
        document.getElementById(`carousel-overlay-controller-next`).addEventListener('click', () => {
            carousel.moveItem('next')
        })

    }, 500)
    
}

class Carousel {
    #_id;
    #_controllers;
    _currentItem = 1;
    #_lastItem = 4;
    #_item = {
        width: 670,
        keyframe: {
                generate: (position) => { `transform: translateX(${position}px)` },
                options: { duration: 2000, fillMode: "both" }
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
    }

    set _currentItem(value) {
        this._currentItem = value
    }

    showOverlay() {
        document.querySelector('.carousel .carousel-overlay').classList.add('carousel-overlay--hover')
    }

    hideOverlay() {
        document.querySelector('.carousel .carousel-overlay').classList.remove('carousel-overlay--hover')
    }

    moveItem(direction) {
        
        if (this._currentItem === 1 && direction === 'previous') return this.changeItem(this.#_lastItem)

        if (this._currentItem === this.#_lastItem && direction === 'next') return this.changeItem(1)

        this.#_controllers[direction].changeItem()
        
    }
    changeItem(item) {
        this.translateItem((-item + 1) * this.#_item.width)
        this._currentItem = item
    }

    translateItem(position) {
        // document.querySelector('.carousel-content').style.animation = 'bounce 2s infinite'
        document.querySelector('.carousel-content').style.transform = `translateX(${position}px)`
        console.log(position)
    }
}