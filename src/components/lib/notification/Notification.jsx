import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Notification extends Component {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        destroy: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onClick: () => {},
    }

    componentDidMount() {
        this.quitTimeout = setTimeout(() => {
            this.willQuit();
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.quitTimeout);
    }

    willQuit(callback) {
        callback && callback();
        this.props.destroy();
    }

    render() {
        const { icon, title, content, onClick } = this.props;
        return (
            <div // eslint-disable-line
              className="notification"
              onClick={() => {
                  this.willQuit(onClick);
              }}
            >
                <div className="pull-left icon-wrap">
                    <i
                      className="icon"
                      style={{
                          backgroundImage: `url(${icon})`,
                      }}
                    />
                </div>
                <div className="pull-left content-wrap">
                    <h3 className="title">{ title }</h3>
                    <p className="content">{ content }</p>
                </div>
            </div>
        );
    }
}

export default Notification;
