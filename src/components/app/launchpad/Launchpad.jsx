import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './launchpad.css';
import manifest from './manifest';

class Launchpad extends Component {
    static propTypes = {
        closeApp: PropTypes.func.isRequired,
    }

    state = {
        willQuit: false
    }

    willQuit = () => {
        this.setState({ willQuit: true }, () => {
            setTimeout(() => {
                this.props.closeApp(manifest.appid);
            }, 300);
        });
    }

    render() {
        const { willQuit } = this.state;
        return (
            <div
                className={`launchpad ${willQuit ? 'willQuit' : ''}`}
                onClick={this.willQuit}
            >
                <div className="bg-wrap"></div>
                <div className="body"></div>
            </div>
        )
    }
}

export default Launchpad;
