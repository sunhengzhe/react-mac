export function throttle(fn, delay, mustRunDelay) {
    let timer = null;
    let start;
    return function (...args) {
        const curr = +new Date();
        clearTimeout(timer);
        if (!start) {
            start = curr;
        }
        if (curr - start >= mustRunDelay) {
            fn.apply(this, args);
            start = curr;
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        }
    };
}

export function moment(timestamp = +new Date()) {
    const prefix = (num) => (num = num < 10 ? `0${num}` : num);

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekIndex = date.getDay();
    const week = ['日', '一', '二', '三', '四', '五', '六'][weekIndex];
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return {
        format: (format) => (
            format.replace('YYYY', year)
                .replace('MM', prefix(month))
                .replace('M', month)
                .replace('DD', prefix(day))
                .replace('D', day)
                .replace('W', week)
                .replace('HH', prefix(hour))
                .replace('H', hour)
                .replace('mm', prefix(min))
                .replace('m', min)
                .replace('ss', prefix(sec))
                .replace('s', sec)
        ),
    };
}

export const fullScreen = (element) => {
    if (element.requestFullscreen) {
        // W3C
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        // Firefox (works in nightly)
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        // Webkit (works in Safari and Chrome)
        element.webkitRequestFullScreen();
    } else if (element.requestFullScreen) {
        // mozilla草案
        element.requestFullScreen();
    }
};
