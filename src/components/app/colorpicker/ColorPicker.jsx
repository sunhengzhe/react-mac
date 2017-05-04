import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ControlBtnGroup from '../../lib/control-btn-group/ControlBtnGroup';
import wrapApp from '../wrapApp';

import './colorpicker.css';
import manifest from './manifest';
import colors from './colors';

class ColorPicker extends Component {

    static propTypes = {
        closeApp: PropTypes.func,
    }

    render() {
        return (
            <div className="color-picker">
                <div className="header">
                    <ControlBtnGroup
                        onClose={() => {
                            this.props.closeApp(manifest.appid);
                        }}
                        onMax={() => {

                        }}
                        onMin={() => {

                        }}
                    />
                </div>
                <div className="body">
                    <div className="info-panel">

                    </div>
                    <div className="content-panel">
                        {
                            colors.map((group, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="color-group"
                                    >
                                        {
                                            group.map(color => {
                                                return (
                                                    <div
                                                        style={{ background: color }}
                                                        key={color}
                                                        className="color">
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default wrapApp(ColorPicker, {
    initWidth: 800,
    initHeight: 500,
});
