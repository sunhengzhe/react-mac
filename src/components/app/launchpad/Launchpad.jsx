import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './launchpad.css';
import manifest from './manifest';

const MARGIN_TOP = 70;
const MARGIN_RIGHT = 120;
const MARGIN_BOTTOM = 90;
const MARGIN_LEFT = 170;
const VERTICAL_MARGIN = 35;
const HORIZON_MARGIN = 70;
const ROW_NUM = 4;
const COL_NUM = 7;
const $windowWidth = window.innerWidth;
const $windowHeight = window.innerHeight;
const BOX_WIDTH = ($windowWidth - MARGIN_LEFT - MARGIN_RIGHT - (COL_NUM - 1) * HORIZON_MARGIN) / COL_NUM;
const BOX_HEIGHT = ($windowHeight - MARGIN_TOP - MARGIN_BOTTOM - (ROW_NUM - 1) * VERTICAL_MARGIN) / ROW_NUM;

class Launchpad extends Component {
    static propTypes = {
        closeApp: PropTypes.func.isRequired,
        openApp: PropTypes.func.isRequired,
        apps: PropTypes.array.isRequired,
    }

    willQuit = (callback) => {
        this.wrap.classList.add('will-quit');
        setTimeout(() => {
            this.props.closeApp(manifest.appid);
            callback && callback();
        }, 300);
    }

    render() {
        const { apps, openApp } = this.props;
        return (
            <div
                ref={(node) => this.wrap = node}
                className="launchpad"
                onClick={() => this.willQuit()}
            >
                <div className="bg-wrap"></div>
                <div className="body">
                    {
                        apps.map((app, index) => {

                            const wrapStyle = {
                                left: MARGIN_LEFT + (BOX_WIDTH + HORIZON_MARGIN) * (index % COL_NUM),
                                top: MARGIN_TOP + (BOX_HEIGHT + VERTICAL_MARGIN) * parseInt(index / COL_NUM, 10),
                            };

                            const iconStyle = {
                                width: BOX_WIDTH,
                                height: BOX_WIDTH,
                                backgroundImage: `url(${app.icon})`,
                                backgroundSize: `${BOX_WIDTH}px ${BOX_WIDTH}px`,
                            }

                            return (
                                <div
                                    key={app.displayName}
                                    className="app-wrap"
                                    style={wrapStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.add('will-open');
                                        this.willQuit(() => {
                                            openApp(app.appid);
                                        });
                                    }}
                                >
                                    <div
                                        key={app.displayName}
                                        className="appicon"
                                        style={iconStyle}
                                    >

                                    </div>
                                    <span className="appname">
                                        { app.displayName }
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Launchpad;
