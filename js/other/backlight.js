const foreword = document.querySelector('.foreword');
const clks = document.querySelectorAll('.clk');
const lightOn = document.querySelector('.foreword #backlightOn');
const animOn = document.querySelector('.foreword #openAnimationOn');
const notation = document.querySelector('.foreword .notation');
const forewordClose = foreword.querySelector('.close');
const openForeword = document.querySelector('.openForeword');


lightOn.addEventListener('click', () => {
    lightOn.classList.toggle('on');

    if (lightOn.classList.contains('on')) {
        lightOn.textContent = 'Выключить подсветку';
        notation.textContent = 'Листайте страницу';
    } else {
        lightOn.textContent = 'Включить подсветку';
        notation.textContent = '';
    }
    clks.forEach(el => el.classList.toggle('pulse'));
});

animOn.addEventListener('click', () => {
    animOn.classList.toggle('on');
    if (animOn.classList.contains('on')) {
        animOn.textContent = 'Выключить анимацию';
        notation.textContent = 'Перезагрузите страницу'
        localStorage.setItem('animation', 'true');
    } else {
        animOn.textContent = 'Включить анимацию';
        notation.textContent = 'Перезагрузите страницу'
        localStorage.setItem('animation', 'false');
    }

});

forewordClose.addEventListener('click', () => {
    foreword.classList.remove('active');
});

openForeword.addEventListener('click', () => {
    foreword.classList.add('active');
    openForeword.classList.remove('active');
});

if (localStorage.getItem('animation') === 'true') {
    animOn.textContent = 'Выключить анимацию';
    animOn.classList.add('on');
    for (let i = 0; i < 50; i++) {
        const elem = document.createElement('div')
        elem.classList.add('anim');
        elem.style.top = 30 * i + 'px';
        elem.style.opacity = i / 20 + ''
        document.body.appendChild(elem);
    }
    const cl = randColor();
    document.querySelectorAll('.anim').forEach((el) => {
        el.style.background = cl
    })
    setTimeout(() => {
        document.querySelectorAll('.anim').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 10)
        })
    }, 500)

    setTimeout(() => {
        document.querySelectorAll('.anim').forEach(el => el.remove())
    }, 3000)

    
}

const links = document.querySelectorAll('a[href^=http]');
links.forEach(link => link.setAttribute('target', '_blank'))

let counter = JSON.parse(localStorage.getItem('counter')) || 0;

counter++;

localStorage.setItem('counter', counter);

if (JSON.parse(localStorage.getItem('counter')) < 2) {
    window.addEventListener('load', () => {
        setTimeout(() => foreword.classList.add('active'), 1500);
    });
}

function randColor() {
    const r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
}