/* global io */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultIcon from 'images/headers/default';
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
        usericon: defaultIcon,
        // 用户昵称
        usernick: '',
        // 当前所在的聊天界面
        curChatId: 'onlineGroup',
        chatList: [
            {
                chatid: 'onlineGroup',
                isGroup: true,
                icon: onlineGroupIcon,
                nick: '当前在线的闲人们',
                message: '',
                time: '',
            },
            {
                chatid: 'robot',
                isGroup: false,
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
                total: 0,
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
        // 打开 socket
        this.socket = io('http://47.93.21.106:3000/wechat');

        /* socket 事件 */
        // 生成用户信息
        this.socket.on('create userInfo', (data) => {
            const createUserInfo = ({ usericon, usernick }) => {
                this.props.addNotification({
                    icon: usericon,
                    title: usernick,
                    content: `恭喜！你被分配到昵称：${usernick}`,
                });

                localStorage.setItem('wechatinfo', JSON.stringify({ usericon, usernick }));
            };

            const { usericon, usernick } = data;

            this.setState({ usericon, usernick });

            try {
                const userinfo = JSON.parse(localStorage.getItem('wechatinfo'));

                if (usericon !== userinfo.usericon || usernick !== userinfo.usernick) {
                    createUserInfo(data);
                }
            } catch (e) {
                createUserInfo(data);
            }
        });

        // 获取聊天群人数
        this.socket.on('answer group total', (data) => {
            const { chatid, total } = data;
            console.log(chatid, total);
            this.setState((state) => {
                const { chatContent } = state;
                chatContent[chatid].total = total;
                return {
                    ...state,
                    chatContent: {
                        ...chatContent,
                    },
                };
            });
        });

        // 新消息
        this.socket.on('wechat message', (data) => {
            const { chatid, message, userInfo } = data;
            this.updateStateByMsg(chatid, {
                content: message,
                isMe: false,
                ...userInfo,
            });
        });

        // 有人加入
        this.socket.on('someone enter', (data) => {
            const { chatid, content } = data;
            this.updateStateByMsg(chatid, {
                content,
                isSystem: true,
            });
        });

        // 有人离开
        this.socket.on('someone leave', (data) => {
            const { chatid, content } = data;
            this.updateStateByMsg(chatid, {
                content,
                isSystem: true,
            });
        });
    }

    componentWillUnmount() {
        document.onselectstart = function (e) {
            e.returnValue = false;
        };
        // 关闭 socket
        this.socket.close();
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
        const { chatContent } = this.state;
        this.setState({ curChatId: chatid }, this.scrollToBottom);
        if (chatContent[chatid].isGroup) {
            this.socket.emit('ask group total', chatid);
        }
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
        const { curChatId, usernick } = this.state;
        if (curChatId === 'robot') {
            // 机器人
            this.talkToRobot(message);
        } else {
            // 正常发消息
            this.socket.emit('wechat message', { chatid: curChatId, message });
            this.updateStateByMsg(curChatId, {
                content: message,
                isMe: true,
                usernick,
            });
        }
    }

    /**
     * 根据消息更新微信状态
     * @memberof Wechat
     */
    updateStateByMsg = (chatid, message) => {
        this.setState(state => {
            const { chatContent } = state;

            // 聊天界面中添加一行
            chatContent[chatid].messages.push(message);

            return {
                ...state,
                chatList: [
                    // 更新聊天列表
                    ...state.chatList.map(chatItem => {
                        if (chatItem.chatid === chatid) {
                            let content = '';
                            if (message.isSystem || !chatItem.isGroup) {
                                content = message.content;
                            } else {
                                content = `${message.usernick}:${message.content}`;
                            }

                            return {
                                ...chatItem,
                                message: content,
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
        this.updateStateByMsg(curChatId, {
            content: message,
            isMe: true,
        });

        sendMessage({
            message,
            chatid: curChatId,
        }).then((resp) => {
            const { data } = resp;

            this.updateStateByMsg(data.chatid, {
                content: data.message,
                isMe: false,
            });
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
        const { usericon, chatList, curChatId, chatContent, curTab } = this.state;
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
                          backgroundImage: `url(${usericon})`,
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
                        {
                            curChat.isGroup ? `${curChat.usernick} (${curChat.total})`
                            : curChat.usernick
                        }
                    </DraggableArea>
                    <div
                      className="chat-content"
                      ref={node => (this.chatContentEle = node)}
                    >
                        {
                            curChat.messages.map((message, index) => {
                                let icon = null;
                                if (message.isMe) {
                                    icon = usericon;
                                } else if (curChat.isGroup) {
                                    // 群组聊天
                                    icon = message.usericon;
                                } else {
                                    // 单聊
                                    icon = curChat.usericon;
                                }

                                return message.isSystem ? (
                                    <div
                                      key={index} // eslint-disable-line
                                      className="chat-line system"
                                    >
                                        { message.content }
                                    </div>
                                ) : (
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
                                        {
                                            // 如果是群组，其他人要加上昵称
                                            curChat.isGroup && !message.isMe ? (
                                                <p className="chat-nick">{message.usernick}</p>
                                            ) : ''
                                        }
                                        <p
                                          className={`chat-message ${
                                              curChat.isGroup && !message.isMe ? 'group' : ''
                                          }`}
                                        >
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
