import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './launchpad.css';

class Launchpad extends Component {
    static propTypes = {
        openApp: PropTypes.func.isRequired,
        apps: PropTypes.arrayOf(PropTypes.object).isRequired,
        hideLaunchpad: PropTypes.func.isRequired,
        changeScreen: PropTypes.func.isRequired,
    }

    willQuit = (callback) => {
        const { changeScreen, hideLaunchpad } = this.props;
        changeScreen(0);
        hideLaunchpad();
        callback && callback();
    }

    render() {
        const { apps, openApp } = this.props;
        return (
            <div // eslint-disable-line
              ref={ele => (this.ele = ele)}
              className="launchpad"
              onClick={() => this.willQuit()}
            >
                <div className="bg-wrap" />
                <div className="body">
                    {
                        apps.map((app) => {
                            const iconStyle = {
                                backgroundImage: `url(${app.icon})`,
                            };

                            return (
                                <div // eslint-disable-line
                                  key={app.displayName}
                                  className="app-wrap"
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      e.target.classList.add('will-open');
                                      this.willQuit(() => {
                                          openApp(app.appid);
                                      });
                                  }}
                                >
                                    <div // eslint-disable-line
                                      key={app.displayName}
                                      className="appicon"
                                      style={iconStyle}
                                    >

                                    </div>
                                    <span className="appname">
                                        { app.displayName }
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Launchpad;
