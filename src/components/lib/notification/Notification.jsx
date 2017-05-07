import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Notification extends Component {

    static propTypes = {
        icon: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        onClick: PropTypes.func,
        destroy: PropTypes.func,
    }

    state = {
        willQuit: false,
    }

    componentDidMount() {
        this.quitTimeout = setTimeout(() => {
            this.willQuit();
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.quitTimeout);
        clearTimeout(this.animTimeout);
    }

    willQuit(callback) {
        callback && callback();
        this.setState({ willQuit: true });
        this.animTimeout = setTimeout(() => {
            this.props.destroy();
        }, 500);
    }

    render() {
        const { willQuit } = this.state;
        const { icon, title, content, onClick } = this.props;
        return (
            <div
                className={`notification ${willQuit ? 'will-quit' : ''}`}
                onClick={() => {
                    this.willQuit(onClick);
                }}
            >
                <div className="pull-left icon-wrap">
                    <i
                        className="icon"
                        style={{
                            backgroundImage: `url(${icon})`
                        }}
                    ></i>
                </div>
                <div className="pull-left content-wrap">
                    <h3 className="title">{ title }</h3>
                    <p className="content">{ content }</p>
                </div>
            </div>
        )
    }
}

export default Notification;
