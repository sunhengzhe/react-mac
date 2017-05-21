import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cola from 'images/headers/cola';
import shituotuo from 'images/headers/shituotuo';
import onlineGroupIcon from 'images/headers/online-group.png';
import { moment } from 'utils';
import wrapApp from '../wrapApp';
import manifest from './manifest';
import ControlBtnGroup from '../../lib/control-btn-group/ControlBtnGroup';

import wechatIcon from './icon';
import './wechat.css';

const tabs = ['chat', 'contact', 'collect'];

class Wechat extends Component {

    static propTypes = {
        DraggableArea: PropTypes.func.isRequired,
        closeApp: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
    }

    state = {
        // tab
        curTab: 'chat',
        // 用户头像
        userIcon: cola,
        // 当前所在的聊天界面
        curChatId: 'onlineGroup',
        chatList: [
            {
                chatid: 'onlineGroup',
                icon: onlineGroupIcon,
                nick: '当前在线的闲人们',
                message: '',
                time: '',
            },
            {
                chatid: 'robot',
                icon: shituotuo,
                nick: '阿哲的影分身',
                message: '',
                time: '',
            },
        ],
        chatContent: {
            robot: {
                isGroup: false,
                usericon: shituotuo,
                usernick: '阿哲的影分身',
                messages: [],
            },
            onlineGroup: {
                isGroup: true,
                usernick: '当前在线的闲人们',
                messages: [],
            },
        },
    }

    componentDidMount() {
        document.onselectstart = function (e) {
            e.returnValue = true;
        };
        this.chatContentEle.scrollTop = this.chatContentEle.scrollHeight;
        this.input.focus();
    }

    componentWillUnmount() {
        document.onselectstart = function (e) {
            e.returnValue = false;
        };
    }

    /**
     * 滑动至底部
     * @memberof Wechat
     */
    scrollToBottom = () => {
        this.chatContentEle.scrollTop = this.chatContentEle.scrollHeight;
    }

    /**
     * 切换聊天界面
     * @memberof Wechat
     */
    selectChat = (chatid) => {
        this.setState({ curChatId: chatid }, this.scrollToBottom);
    }

    changeTab = (tab) => {
        if (tab !== 'chat') {
            this.props.addNotification({
                icon: wechatIcon,
                title: '这是个假的按钮！',
                content: '尴尬了，一不小心就被发现了',
            });
        }
    }

    sorry = () => {
        this.props.addNotification({
            icon: wechatIcon,
            title: '这里统统不能点！',
            content: '你以为这真的是微信啊？',
        });
    }

    /**
     * 发送消息
     * @memberof Wechat
     */
    sendMessage = (message) => {
        const { curChatId } = this.state;
        if (curChatId === 'robot') {
            // 机器人
            this.talkToRobot(message);
        }
    }

    /**
     * 根据消息更新微信状态
     * @memberof Wechat
     */
    updateStateByMsg = (curChatId, message, isMe) => {
        this.setState(state => {
            const { chatContent } = state;

            // 聊天界面中添加一行
            chatContent[curChatId].messages.push({
                isMe,
                content: message,
            });

            return {
                ...state,
                chatList: [
                    // 更新聊天列表
                    ...state.chatList.map(chatItem => {
                        if (chatItem.chatid === 'robot') {
                            return {
                                ...chatItem,
                                message,
                                time: moment().format('HH:mm'),
                            };
                        }
                        return chatItem;
                    }),
                ],
                chatContent: {
                    // 更新聊天界面
                    ...chatContent,
                },
            };
        }, this.scrollToBottom);
    }

    /**
     * 发送消息
     * @memberof Wechat
     */
    talkToRobot = (message) => {
        const { sendMessage } = this.props;
        const { curChatId } = this.state;

        // 添加用户发送的话
        this.updateStateByMsg(curChatId, message, true);

        sendMessage({
            message,
            chatid: curChatId,
        }).then((resp) => {
            const { data } = resp;

            this.updateStateByMsg(data.chatid, data.message, false);
        });
    }

    /**
     * 输入框键盘事件
     * @memberof Wechat
     */
    handleKeyDown = (e) => {
        const { keyCode, shiftKey } = e;
        if (keyCode === 13) {
            if (shiftKey) {
                return;
            }
            e.preventDefault();
            let message = this.input.innerHTML;
            // 转义
            message = message.replace('&nbsp', ' ');
            message = message.replace('<br>', '\n');
            this.sendMessage(message);
            this.input.innerHTML = '';
        }
    }

    render() {
        const { DraggableArea, closeApp } = this.props;
        const { userIcon, chatList, curChatId, chatContent, curTab } = this.state;
        const curChat = chatContent[curChatId];

        return (
            <div
              className="wechat"
              ref={node => (this.ele = node)}
            >
                <DraggableArea
                  className="left-header"
                >
                    <ControlBtnGroup
                      onClose={() => {
                          closeApp(manifest.appid);
                      }}
                      onMax={() => {

                      }}
                      onMin="disabled"
                    />

                    <i
                      className="head-icon"
                      style={{
                          backgroundImage: `url(${userIcon})`,
                      }}
                    />

                    <div className="tab-wrapper">
                        {
                            tabs.map(tab => (
                                <i // eslint-disable-line
                                  key={tab}
                                  className={
                                      `tab-icon ${
                                          tab === curTab ? 'active' : ''
                                      } ${tab}`}
                                  onClick={() => this.changeTab(tab)}
                                />
                            ))
                        }
                    </div>

                </DraggableArea>
                <div className="chat-list-wrapper">
                    <DraggableArea className="search-box">
                        <input type="text" placeholder="搜索" />
                        <i className="search-icon" />
                        <a // eslint-disable-line
                          className="add-btn"
                        />
                    </DraggableArea>
                    {
                        chatList.map((chat) => {
                            const { chatid, nick, message, time, icon } = chat;
                            const activeClsName = chat.chatid === curChatId ? 'active' : '';
                            return (
                                <div //eslint-disable-line
                                  key={chatid}
                                  className={`chat-item ${activeClsName}`}
                                  onClick={() => this.selectChat(chatid)}
                                >
                                    <div className="chat-item-wrapper">
                                        <i
                                          className="chat-item-icon"
                                          style={{
                                              backgroundImage: `url(${icon})`,
                                          }}
                                        />
                                        <p className="chat-item-nick">{ nick }</p>
                                        <span className="chat-item-message">{ message }</span>
                                        <span className="chat-item-time">{ time }</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="body">
                    <DraggableArea className="chat-header">
                        { curChat.usernick }
                    </DraggableArea>
                    <div
                      className="chat-content"
                      ref={node => (this.chatContentEle = node)}
                    >
                        {
                            curChat.messages.map((message, index) => {
                                let icon = null;
                                if (!curChat.isGroup) {
                                    icon = message.isMe ? userIcon : curChat.usericon;
                                }

                                return (
                                    <div
                                      key={index} // eslint-disable-line
                                      className={`chat-line ${message.isMe ? 'me' : ''}`}
                                    >
                                        <i
                                          className="chat-icon"
                                          style={{
                                              backgroundImage: `url(${icon})`,
                                          }}
                                        />
                                        <p className="chat-message">
                                            { message.content }
                                        </p>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="input-content">
                        <div
                          className="tool-bar"
                        >
                            <i // eslint-disable-line
                              className="tool-btn expression-btn"
                              onClick={this.sorry}
                            />
                            <i // eslint-disable-line
                              className="tool-btn file-btn"
                              onClick={this.sorry}
                            />
                            <i // eslint-disable-line
                              className="tool-btn shear-btn"
                              onClick={this.sorry}
                            />
                        </div>
                        <div // eslint-disable-line
                          className="input-area"
                          contentEditable="true"
                          ref={node => (this.input = node)}
                          onKeyDown={this.handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default wrapApp(Wechat, {
    appid: manifest.appid,
    initWidth: 900,
    initHeight: 600,
});
