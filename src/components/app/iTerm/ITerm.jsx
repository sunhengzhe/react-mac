import React, { Component } from 'react';
import PropTypes from 'prop-types';

import wrapApp from '../wrapApp';
import manifest from './manifest';
import ControlBtnGroup from '../../lib/control-btn-group/ControlBtnGroup';
import cmd from './commands';
import Line from './Line/Line';
import utils from './utils';
import { moment } from '../../../utils';
import './iTerm.css';

class ITerm extends Component {

    static propTypes = {
        closeApp: PropTypes.func.isRequired,
        DraggableArea: PropTypes.func.isRequired,
        fullScreen: PropTypes.func.isRequired,
    }

    constructor(...args) {
        super(...args);

        this.state = {
            selectedText: [],
            lines: [],
            curLineIndex: 0,
            cursorPos: 0,
        };

        document.addEventListener('keydown', (e) => {
            const { curLineIndex, lines } = this.state;
            const curLine = lines[curLineIndex];

            const curText = curLine.text || '';
            const curPos = curLine.cursorPos;

            const keyCode = e.keyCode;

            if (keyCode === 13) {
                // 执行命令
                this.exec(curText);
            } else {
                if (keyCode === 8) {
                    if (curPos === 0) {
                        return;
                    }
                    // 删除
                    curLine.text = curText.slice(0, curPos - 1) + curText.slice(curPos);
                    curLine.cursorPos -= 1;
                } else if (keyCode === 37) {
                    // 左移
                    curLine.cursorPos -= 1;
                } else if (keyCode === 39) {
                    // 右移
                    curLine.cursorPos += 1;
                } else {
                    if (!utils.isValidInput(keyCode)) {
                        return;
                    }
                    // 输入
                    curLine.text = curText.slice(0, curPos) + e.key + curText.slice(curPos);
                    curLine.cursorPos += 1;
                }

                // 矫正光标位置
                if (curLine.cursorPos < 0) {
                    curLine.cursorPos = 0;
                }

                if (curLine.cursorPos >= curLine.text.length) {
                    curLine.cursorPos = curLine.text.length;
                }

                this.setState({
                    lines: [
                        ...lines.splice(0, curLineIndex),
                        curLine,
                        ...lines.splice(curLineIndex),
                    ],
                });
            }
        });
    }

    componentWillMount() {
        this.init();
    }

    getNewLine = (attr = {}) => {
        const { hasHead = true, text = '', cursorPos = 0 } = attr;
        return {
            hasHead,
            text,
            cursorPos,
        };
    }

    init = () => {
        const lastLoginTime = +localStorage.getItem('last-login-iTerm') || +new Date();
        localStorage.setItem('last-login-iTerm', +new Date());

        const welcomeLine = {
            hasHead: false,
            text: `Last login: ${moment(lastLoginTime).format('YYYY-MM-DD HH:mm:ss')} on Mac`,
        };

        const newLine = this.getNewLine();

        this.setState({
            lines: [welcomeLine, newLine],
            curLineIndex: 1,
        });
    }

    exec(command) {
        const { curLineIndex, lines } = this.state;

        const _command = command.trim();

        let resultLines = [];

        if (_command) {
            resultLines = cmd(_command) || [];
        }

        // 添加新行
        const newLine = this.getNewLine();
        this.setState({
            lines: [...lines, ...resultLines, newLine],
            curLineIndex: curLineIndex + resultLines.length + 1,
        });
    }

    render() {
        const { DraggableArea, closeApp, fullScreen } = this.props;
        const { lines, curLineIndex } = this.state;
        return (
            <div className="iTerm">
                <DraggableArea
                  className="default-header header"
                >
                    <ControlBtnGroup
                      onClose={() => {
                          closeApp(manifest.appid);
                      }}
                      onMax={fullScreen}
                      onMin="disabled"
                    />
                </DraggableArea>
                <div className="body">
                    {
                        lines.map((item, index) => {
                            const { hasHead = true, text = '', cursorPos } = item;
                            const isCurLine = index === curLineIndex;
                            return (
                                <Line
                                  key={index} // eslint-disable-line
                                  isCurLine={isCurLine}
                                  hasHead={hasHead}
                                  text={text}
                                  cursorPos={cursorPos}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default wrapApp(ITerm, {
    appid: manifest.appid,
    initWidth: 585,
    initHeight: 440,
});
