import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './app.css';

export default (
    WrappedComponent,
    options = {}
) => {

    class App extends Component {

        static propTypes = {
            closeApp: PropTypes.func.isRequired,
            addNotification: PropTypes.func,
        };

        constructor(...args) {
            super(...args);
            const { initWidth, initHeight } = options;
            this.moveLock = true;
            this.pos = {
                x: initWidth ? (window.innerWidth - initWidth) / 2 : 300,
                y: initHeight ? (window.innerHeight - initHeight) / 2 : 100
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
                    { props.children }
                </div>
            );
        }

        onAppMouseDown = () => {
            this.ele.style.zIndex = +((+new Date() + '').slice(5, -3));
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
        onDraggableAreaMouseUp = (e) => {
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

                this.ele.style.top = this.pos.y + 'px';
                this.ele.style.left = this.pos.x + 'px';

                this.lastX = clientX;
                this.lastY = clientY;
                this.moveTime = +new Date();
            }
        }

        render() {
            return (
                <div
                    ref={(ele) => this.ele = ele}
                    className="app"
                    style={{
                        top: this.pos.y,
                        left: this.pos.x,
                        zIndex: +((+new Date() + '').slice(5, -3))
                    }}
                    onMouseDown={this.onAppMouseDown}
                >
                    <WrappedComponent
                        { ...this.props }
                        DraggableArea={this.DraggableArea}
                    />
                </div>
            );
        }
    }

    return App;
}
