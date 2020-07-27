function Slider() {
    this.find = (selector, multi = false) => { // method that finds elements in short way
        if (multi) {
            return Array.from(document.querySelectorAll(selector));
        } else {
            return document.querySelector(selector);
        }
    }

    this.moveLeft = () => { // Move left function
        return this.moveTo('left')
    }

    this.moveRight = () => { // Move right function
        return this.moveTo('right')
    }

    this.initControls = () => {
        console.log('initialized')
        this._arrowLeft.addEventListener('click', () => {
            console.log('move left');
            this.moveLeft()
        });
        this._arrowRight.addEventListener('click', () => {
            console.log('move right');
            this.moveRight()
        });
    }

    this.initItems = () => {
        const percents = this.percents; // %
        const width = percents / Math.round(this.slidesPerView);
        Array.from(this._items).forEach(item => {
            // item.style.transform = `translateX(0px)`
            item.style.width = `${width}%`
            item.style.minWidth = `${width}%`
        })
    }

    this.moveTo = (direction = 'right') => {
        this._wrapper.style.opacity = 0;
        setTimeout(() => {
            this._wrapper.innerHTML = null;

            if (direction === 'right') {
                this._draw.push(this._draw[0])
                this._draw = this._draw.slice(1, this._draw.length);
            } else if (direction === 'left') {
                this._draw.unshift(this._draw[this._draw.length - 1])
                this._draw = this._draw.slice(0, this._draw.length - 1);
            }
            this._wrapper.style.opacity = 1
            return this._draw.forEach(el => this._wrapper.append(el))

        }, this.changeSlidesAnimationSpeed)

    }

    this.autoPlay = (on = true) => {
        if (on) {
            this.interval = setInterval(() => this.moveRight(), this.autoPlaySpeed);
        } else {
            return clearInterval(this.interval);
        }
    }

    // mouse events
    this.initializeSwipe = () => {
        let start = 0, final = 0;

        this._parent.addEventListener('mousedown', (e) => {
            this._wrapper.style.cursor = 'grabbing'
            start = e.clientX;
        })
        this._parent.addEventListener('mouseup', (e) => {
            this._wrapper.style.cursor = 'grab'
            final = e.clientX;

            if (start > final) {
                this.moveRight();
            } else if (start < final) {
                this.moveLeft();
            } else {
                return;
            }
        })
        this._parent.addEventListener('mouseover', () => {
            this.autoPlay(false);
        })
        this._parent.addEventListener('mouseleave', () => {
            clearTimeout(this._blocked);

            this._blocked = setTimeout(() => {
                this.isAutoPlay ? this.autoPlay() : this.autoPlay(false);
            }, this.delayBeforeAutoplay);
        })
    }
}

function PortfolioSlider(options) {
    Slider.apply(this, options)
    const { parent, wrapper, arrowLeft, arrowRight, eachItemClass } = options;
    const { slidesPerView = 3, isAutoPlay = true, delayBeforeAutoplay = 5000,
        autoPlaySpeed = 2000, changeSlidesAnimationSpeed, percents = 100 } = options;

    this._parent = this.find(parent);
    this._wrapper = this.find(wrapper);
    this._arrowLeft = this.find(arrowLeft);
    this._arrowRight = this.find(arrowRight);
    this._items = this.find(eachItemClass, true);
    this.percents = percents;
    this._draw = this._items; // Copy main array with slides

    this._blocked = false;
    this.slidesPerView = slidesPerView; // quantity slides on view
    this.delayBeforeAutoplay = delayBeforeAutoplay; // ms
    this.isAutoPlay = isAutoPlay;
    this.isAutoPlay ? this.autoPlaySpeed = autoPlaySpeed : null; // ms
    this.changeSlidesAnimationSpeed = changeSlidesAnimationSpeed; // ms

    // Default initializations
    this.initItems() // Initialization items
    this.initControls(); // Initialization controls
    this.isAutoPlay ? this.autoPlay() : this.autoPlay(false); // Autoplay toggle (true/false)
    this.initializeSwipe()
}

function TestimonialsSlider(options) {
    Slider.apply(this, options);
    PortfolioSlider(options);
}