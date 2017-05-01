import React, { Component } from 'react';

import wrapApp from '../wrapApp';
import './intro.css';

const HEADICON_SIZE = {
    from: 78,
    to: 0,
};

const HEADICON_OPACITY = {
    from: 1,
    to: 0,
};

const HEADICON_TOP = {
    from: -12,
    to: 27,
};

const NAME_SIZE = {
    from: 24,
    to: 16,
};

const NAME_TOP = {
    from: 90,
    to: 10,
};

const INTRODUCE_TOP = {
    from: 126,
    to: 30,
};

const INTRODUCE_OPACITY = {
    from: 1,
    to: 0,
};

const SOCIAL_TOP = {
    from: 150,
    to: 40,
};

const SOCIAL_SIZE = {
    from: 28,
    to: 20,
};

const MAX_SCROLL = 120;

class Intro extends Component {

    state = {
        scrollTop: 0,
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    onScroll = (e) => {
        if (this.ele.scrollTop > MAX_SCROLL) {
            return;
        }
        this.setState({ scrollTop: this.ele.scrollTop });
    }

    getScaledValue = (fromValue, toValue) => {
        const k = (toValue - fromValue) / MAX_SCROLL;
        const b = toValue - k * MAX_SCROLL;
        const { scrollTop } = this.state;
        return k * scrollTop + b;
    }

    showMore = () => {
        this.timeout = setInterval(() => {
            if (this.ele.scrollTop < MAX_SCROLL - 10) {
                this.ele.scrollTop += 10;
            } else {
                this.ele.scrollTop = MAX_SCROLL;
                clearInterval(this.timeout);
            }
        }, 16);
    }

    render() {
        const headiconStyle = {
            top: this.getScaledValue(HEADICON_TOP.from, HEADICON_TOP.to),
            width: this.getScaledValue(HEADICON_SIZE.from, HEADICON_SIZE.to),
            height: this.getScaledValue(HEADICON_SIZE.from, HEADICON_SIZE.to),
            opacity: this.getScaledValue(HEADICON_OPACITY.from, HEADICON_OPACITY.to),
        };
        const nameStyle = {
            top: this.getScaledValue(NAME_TOP.from, NAME_TOP.to),
            fontSize: this.getScaledValue(NAME_SIZE.from, NAME_SIZE.to),
        };
        const introduceStyle = {
            top: this.getScaledValue(INTRODUCE_TOP.from, INTRODUCE_TOP.to),
            opacity: this.getScaledValue(INTRODUCE_OPACITY.from, INTRODUCE_OPACITY.to),
        };
        const socialStyle = {
            top: this.getScaledValue(SOCIAL_TOP.from, SOCIAL_TOP.to),
            fontSize: this.getScaledValue(SOCIAL_SIZE.from, SOCIAL_SIZE.to),
        };
        return (
            <div
                className="intro" onScroll={this.onScroll}
            >
                <div
                    className="headicon"
                    style={headiconStyle}
                ></div>
                <div className="scroll-wrap" ref={(ele) => this.ele = ele}>
                    <a className="close-btn"></a>
                    <a
                        className="more"
                        onClick={this.showMore}
                        style={{ display: this.state.scrollTop === 0 ? 'block' : 'none'}}
                    >
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                    <div
                        className="header"
                    >
                        <div
                            className="name"
                            style={nameStyle}
                        >孙恒哲</div>
                        <div
                            className="introduce"
                            style={introduceStyle}
                        >永远相信 美好的事情即将到来</div>
                        <div
                            className="social"
                            style={socialStyle}
                        >
                            <a href="https://github.com/sunhengzhe" target="_blank">
                                <i className="fa fa-github" aria-hidden="true"></i>
                            </a>
                            <a href="http://weibo.com/3025220401" target="_blank">
                                <i className="fa fa-weibo" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div className="body">
                        <div className="basic">
                            <div className="item">
                                <div
                                    className="icon sex"
                                >
                                </div>
                                <p className="desc">性别</p>
                            </div>
                            <div className="item">
                                <div className="text age">
                                    { new Date().getFullYear() - 1994 }
                                </div>
                                <p className="desc">年龄</p>
                            </div>
                            <div className="item">
                                <div
                                    className="icon dog"
                                >
                                </div>
                                <p className="desc">属狗</p>
                            </div>
                            <div className="item">
                                <div
                                    className="icon sagittarius"
                                >
                                </div>
                                <p className="desc">射手座</p>
                            </div>
                            <div className="item">
                                <div className="text birth">
                                    <span className="month">11</span>
                                    <span className="day">28</span>
                                </div>
                                <p className="desc">生日</p>
                            </div>
                            <div className="item">
                                <div className="text blood">
                                    O
                                </div>
                                <p className="desc">血型</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="group">
                                <div className="item">
                                    <span className="desc">姓名</span>
                                    <span className="text">孙恒哲</span>
                                </div>
                                <div className="item">
                                    <span className="desc">手机</span>
                                    <span className="text">15811262651</span>
                                </div>
                                <div className="item">
                                    <span className="desc">邮箱</span>
                                    <span className="text">825980764@qq.com</span>
                                </div>
                                <div className="item">
                                    <span className="desc">地区</span>
                                    <span className="text">北京</span>
                                </div>
                            </div>
                            <div className="group">
                                <div className="item">
                                    <span className="desc">职业</span>
                                    <span className="text">前端工程师</span>
                                </div>
                                <div className="item">
                                    <span className="desc">工作</span>
                                    <span className="text">2016-至今 人人车</span>
                                </div>
                                <div className="item">
                                    <span className="desc">技能</span>
                                    <span className="text">Nodejs、ReactJS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default wrapApp(Intro);