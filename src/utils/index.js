export function throttle(fn, delay, mustRunDelay) {
    var timer = null;
    var start;
    return function (){
        var context = this, args = arguments, curr = +new Date();
        clearTimeout(timer);
        if(!start){
            start = curr;
        }
        if(curr - start >= mustRunDelay){
            fn.apply(context, args);
            start = curr;
        }
        else {
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        }
    };
};

export function moment(timestamp = +new Date()) {
    const prefix = (num) => num = num < 10 ? `0${num}` : num;

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekIndex = date.getDay();
    const week = ['日', '一', '二', '三', '四', '五', '六'][weekIndex];
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();


    return {
        format: (format) => {
            return format.replace('YYYY', year)
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
        }
    }
}
