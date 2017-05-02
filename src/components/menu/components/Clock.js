import React, { Component } from 'react';

class Clock extends Component {
    state = {
        time: ''
    };

    constructor(...args) {
        super(...args);
        this.clock = setInterval(() => {
            const curDate = new Date();
            const month = curDate.getMonth() + 1;
            const day = curDate.getDate();
            const weekIndex = curDate.getDay();
            const week = ['日', '一', '二', '三', '四', '五', '六'][weekIndex];
            let hour = curDate.getHours();
            hour = hour < 10 ? `0${hour}` : hour;
            let min = curDate.getMinutes();
            min = min < 10 ? `0${min}`: min;
            let sec = curDate.getSeconds();
            sec = sec < 10 ? `0${sec}`: sec;

            this.setState({
                time: `${month}月${day}日 周${week} ${hour}:${min}:${sec}`
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.clock);
    }

    render() {
        return (
            <span>{ this.state.time }</span>
        )
    }
}

export default Clock;
