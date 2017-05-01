import React, { Component } from 'react';

import './intro.css';
import icon from './icon.png';

const MIN_HEIGHT = 70;

class Intro extends Component {

    static icon = icon;
    static displayName = '个人介绍';

    componentDidMount() {
        const $panel = document.querySelector('.intro');
        $panel.addEventListener('scroll', () => {
            console.log('enter');
        });
    }

    render() {
        return (
            <div className="intro">
                <a className="close-btn"></a>
                <a className="more">
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className="header">
                    <div className="headicon"></div>
                    <div className="name">孙恒哲</div>
                    <div className="introduce">永远相信 美好的事情即将到来</div>
                    <div className="social">
                        <a href="https://github.com/sunhengzhe">
                            <i className="fa fa-github" aria-hidden="true"></i>
                        </a>
                        <a href="http://weibo.com/3025220401">
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
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Intro;