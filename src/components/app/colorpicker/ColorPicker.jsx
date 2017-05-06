import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ControlBtnGroup from '../../lib/control-btn-group/ControlBtnGroup';
import wrapApp from '../wrapApp';

import './colorpicker.css';
import manifest from './manifest';
import colors from './colors';

function selectText(element) {
    let text = element,
        range,
        selection;

    if (document.body.createTextRange) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        // Others
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        return false;
    }
}

class ColorPicker extends Component {

    static propTypes = {
        closeApp: PropTypes.func,
        DraggableArea: PropTypes.any,
    }

    state = {
        selectLock: false,
        peekColor: '',
        selectedColor: '',
        tips: {
            visibility: false,
            success: true,
        },
    }

    componentDidUpdate() {
        if (this.colorText) {
            selectText(this.colorText);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.tipTimeout);
        window.getSelection().removeAllRanges();
    }

    /**
     * 复制颜色
     * @memberof ColorPicker
     */
    selectColor = () => {
        this.setState({
            selectedColor: this.state.peekColor,
            peekColor: '',
            tips: {
                visibility: false,
            }
        }, () => {
            clearTimeout(this.tipTimeout);

            try {
                document.execCommand('copy');
                this.setState({
                    tips: {
                        visibility: true,
                        success: true,
                    }
                });
            } catch (e) {
                this.setState({
                    tips: {
                        visibility: true,
                        success: false,
                    }
                });
            }

            this.tipTimeout = setTimeout(() => {
                this.setState({
                    tips: {
                        visibility: false,
                    }
                });
            }, 3000);
        });
    }

    /**
     * 查看颜色
     * @memberof ColorPicker
     */
    peekColor = (peekColor) => {
        this.setState({ peekColor });
    }

    /**
     * 取消查看颜色
     * @memberof ColorPicker
     */
    cleartColor = () => {
        this.setState({ peekColor: '' });
    }

    render() {
        const { selectedColor, peekColor, tips } = this.state;
        const { DraggableArea, closeApp } = this.props;

        return (
            <div className="color-picker">
                <DraggableArea
                    className="header text-center"
                >
                    <ControlBtnGroup
                        onClose={() => {
                            closeApp(manifest.appid);
                        }}
                        onMax={() => {

                        }}
                        onMin={() => {

                        }}
                    />
                </DraggableArea>
                <div className="body">
                    <div className="info-panel">
                        {
                            tips.visibility ? (
                                <div
                                    className={`tips ${tips.success ? 'success' : 'fail'}`}
                                >
                                    { tips.success ? '复制成功!' : '复制失败，请使用 ctrl + c' }
                                </div>
                            ) : ''
                        }
                        <div
                            className="selected-color"
                            style={{
                                background: peekColor || selectedColor
                            }}
                        ></div>
                        <div className="text-center">
                            {
                                peekColor ? (
                                    <div>
                                        <span>单击以选取颜色：</span><span>{peekColor}</span>
                                    </div>
                                ) : (
                                    selectedColor ? (
                                        <div>
                                            <span>已选取颜色：</span>
                                            <span ref={node => this.colorText = node}>{selectedColor}</span>
                                        </div>
                                    ) : (
                                        <span>单击以选取颜色</span>
                                    )
                                )
                            }
                        </div>
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
                                                        onMouseEnter={() => {this.peekColor(color)}}
                                                        onMouseLeave={() => {this.cleartColor()}}
                                                        onClick={() => {this.selectColor()}}
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
