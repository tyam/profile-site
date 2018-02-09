
export default function (slidePrev, slideNext, adjust) {
    var ox, x;
    var at = null;

    function getX(ev) {
        return (ev.pageX || ev.touches[0].pageX);
    }

    function isPaperExpanded(el) {
        for (let e = el; e != null; e = e.parentElement) {
            if (e.classList.contains('Paper')) {
                return e.classList.contains('_expanded');
            }
        }
        console.log('never');
        return false;
    }

    function touchstart(ev) {
        if (!isPaperExpanded(this)) return;
        ev.preventDefault();
        ox = getX(ev);
        x = ox;
        at = (new Date()).getTime();
        //console.log("start", x);
    }
    function touchmove(ev) {
        if (!isPaperExpanded(this)) return;
        if (!at) return;
        ev.preventDefault();
        x = getX(ev);
        adjust(this, x - ox);
        //console.log("move", x);
    }
    function touchend(ev) {
        if (!isPaperExpanded(this)) return;
        if (!at) return;
        const dx = x - ox;
        const now = (new Date()).getTime();
        //console.log("end");
        if (now - at >= 120 && document.body.clientWidth <= Math.abs(dx)*4) {
            //console.log(`swipe ${(dx < 0) ? 'next' : 'prev'}`);
            at = null;
            adjust(this, 0);
            (dx < 0) ? slideNext(this) : slidePrev(this);
        } else {
            at = null;
            adjust(this, 0);
        }
    }

    return {ontouchstart: touchstart, 
            onmousedown: touchstart, 
            ontouchmove: touchmove, 
            onmousemove: touchmove, 
            ontouchend: touchend, 
            onmouseup: touchend};
}