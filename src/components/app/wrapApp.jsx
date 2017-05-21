import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeApp } from 'reducers/openedApps';
import { addNotification, removeNotification, clearNotification } from 'reducers/notifications';
import './app.css';

export default (
    WrappedComponent,
    options = {},
) => {
    class App extends Component {

        static propTypes = {
            fullScreen: PropTypes.func.isRequired,
        }

        constructor(...args) {
            super(...args);
            const { initWidth, initHeight } = options;
            this.moveLock = true;
            this.pos = {
                x: initWidth ? (window.innerWidth - initWidth) / 2 : 300,
                y: initHeight ? (window.innerHeight - initHeight) / 2 : 100,
            };

            // 可拖拽区域
            this.DraggableArea = (props) => (
                <div
                  {...props}
                  onMouseDown={this.onDraggableAreaMouseDown}
                  onMouseUp={this.onDraggableAreaMouseUp}
                  onMouseLeave={this.onDraggableAreaMouseUp}
                  onMouseMove={this.onDraggableAreaMouseMove}
                >
                    {
                        props.children // eslint-disable-line
                    }
                </div>
            );
        }

        state = {
            // 全屏模式
            fullScreen: false,
        }

        onAppMouseDown = () => {
            this.ele.style.zIndex = +(`${+new Date()}`.slice(5, -3));
        }

        /**
         * 鼠标按下
         * @memberof App
         */
        onDraggableAreaMouseDown = (e) => {
            this.moveLock = false;
            const { clientX, clientY } = e;
            this.lastX = clientX;
            this.lastY = clientY;
        }

        /**
         * 鼠标抬起
         * @memberof App
         */
        onDraggableAreaMouseUp = () => {
            this.moveLock = true;
        }

        /**
         * 鼠标移动
         * @memberof App
         */
        onDraggableAreaMouseMove = (e) => {
            if (!this.moveLock) {
                const { clientX, clientY } = e;
                const disX = clientX - this.lastX;
                const disY = clientY - this.lastY;

                this.pos.x = this.pos.x + disX;
                this.pos.y = this.pos.y + disY;

                if (this.pos.x < 80) {
                    this.pos.x = 80;
                }

                if (this.pos.y < 40) {
                    this.pos.y = 40;
                }

                this.ele.style.top = `${this.pos.y}px`;
                this.ele.style.left = `${this.pos.x}px`;

                this.lastX = clientX;
                this.lastY = clientY;
                this.moveTime = +new Date();
            }
        }

        fullScreen = () => {
            const screenNum = this.props.fullScreen(options.appid);
            this.setState({
                fullScreen: true,
                // 屏幕索引
                screenIndex: screenNum,
            });
        }

        render() {
            const { fullScreen, screenIndex } = this.state;
            return (
                <div
                  ref={(ele) => (this.ele = ele)}
                  className={`app ${fullScreen ? 'full-screen' : ''}`}
                  style={fullScreen ? {
                      transform: `translateX(${screenIndex * 100}%)`,
                      MozTransform: `translateX(${screenIndex * 100}%)`,
                      WebkitTransform: `translateX(${screenIndex * 100}%)`,
                  } : {
                      top: this.pos.y,
                      left: this.pos.x,
                      zIndex: +(`${+new Date()}`.slice(5, -3)),
                  }}
                  onMouseDown={this.onAppMouseDown}
                >
                    <WrappedComponent
                      {...this.props}
                      DraggableArea={this.DraggableArea}
                      fullScreen={this.fullScreen}
                    />
                </div>
            );
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        closeApp: (appid) => {
            dispatch(closeApp(appid));
        },
        addNotification: (...args) => {
            dispatch(clearNotification());
            dispatch(addNotification(...args));
        },
        removeNotification: (id) => {
            dispatch(removeNotification(id));
        },
    });

    return connect(
        null,
        mapDispatchToProps,
    )(App);
};
