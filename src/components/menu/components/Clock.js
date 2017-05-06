import React, { Component } from 'react';

import { moment } from '../../../utils';

class Clock extends Component {
    state = {
        time: moment().format('M月D日 周W HH:mm:ss'),
    };

    constructor(...args) {
        super(...args);
        this.clock = setInterval(() => {
            this.setState({
                time: moment().format('M月D日 周W HH:mm:ss')
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
