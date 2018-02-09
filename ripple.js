
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft, 
        top: window.pageYOffset || document.documentElement.scrollTop
    };
}

function offsetOf(e) {
    const sc = getScroll();
    const rect = e.getBoundingClientRect();
    return {left: sc.left + rect.left, top: sc.top + rect.top};
}

function handleClick(ev) {
    if (this.getElementsByClassName('ink').length == 0) {
        const e = document.createElement('div');
        e.classList.add('ink');
        this.appendChild(e);
    }
    const ink = this.getElementsByClassName('ink')[0];
    ink.classList.remove('_animate');

    if (!ink.offsetWidth && !ink.offsetHeight) {
        const d = Math.max(this.offsetWidth, this.offsetHeight);
        ink.style.height = d + 'px';
        ink.style.width = d + 'px';
    }

    const offset = offsetOf(this);
    const x = ev.pageX - offset.left - (ink.offsetWidth / 2);
    const y = ev.pageY - offset.top - (ink.offsetHeight / 2);
    ink.style.top = y + 'px';
    ink.style.left = x + 'px';
    ink.classList.add('_animate');

    if (this.hasAttribute('href')) {
        const dest = this.getAttribute('href');
        setTimeout(function () {
            if (this.getAttribute('target') == '_blank') {
                window.open(dest, '_blank');
            } else {
                location.href = dest;
            }
        }, 200);
        return false;
    }
}

export default function (el) {
    const es = el.getElementsByClassName("URipple");
    const len = es.length;
    for (let i = 0; i < len; i++) {
        es[i].addEventListener('click', handleClick, false);
    }
}