import React, { Component } from 'react';

import { moment } from '../../../utils';

class Clock extends Component {

    constructor(...args) {
        super(...args);
        this.clock = setInterval(() => {
            this.setState({
                time: moment().format('M月D日 周W HH:mm:ss'),
            });
        }, 1000);
    }

    state = {
        time: moment().format('M月D日 周W HH:mm:ss'),
    };

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
