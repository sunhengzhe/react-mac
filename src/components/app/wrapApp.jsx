import React, { Component } from 'react';

import './app.css';

export default (WrappedComponent) => {
    class App extends Component {

        constructor(...args) {
            super(...args);
            this.moveLock = true;
            this.pos = {x: 300, y: 100};
        }

        componentDidMount() {

        }

        componentWillUnmount() {

        }

        onClose() {

        }

        onQuit() {

        }

        onMouseDown = (e) => {
            this.moveLock = false;
            const { clientX, clientY } = e;
            this.lastX = clientX;
            this.lastY = clientY;
        }

        onMouseUp = (e) => {
            this.moveLock = true;
        }

        onMouseMove = (e) => {
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
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseOut={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    style={{ top: this.pos.y, left: this.pos.x }}
                >
                    <WrappedComponent />
                </div>
            );
        }
    }

    return App;
}
