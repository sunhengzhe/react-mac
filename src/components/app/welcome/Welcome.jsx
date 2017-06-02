import React from 'react';
import ControlBtnGroup from '../../lib/control-btn-group/ControlBtnGroup';
import manifest from './manifest';
import wrapApp from '../wrapApp';
import './welcome.css';

export default wrapApp(({
    DraggableArea,
    closeApp,
}) => {
    localStorage.setItem('checked-update-info', +new Date());
    return (
        <DraggableArea>
            <div className="welcome">
                <div className="header default-header">
                    <ControlBtnGroup
                      onClose={() => {
                          closeApp(manifest.appid);
                      }}
                    />
                    欢迎
                </div>
                <div className="body">
                    <p className="title">全新的系统已经准备完毕，目前可以使用的 APP 如下，欢迎体验~</p>
                    <ul>
                        <li>1、个人介绍</li>
                        <li>2、launchpad</li>
                        <li>3、iTerm</li>
                        <li>4、色彩板</li>
                        <li>5、网易云音乐</li>
                        <li>6、微信</li>
                    </ul>
                    <p>部分 app 支持放大，放大后鼠标移动至屏幕顶端和左端唤出菜单和 Dock。使用 shift + , 和 shift + . 进行屏幕切换。</p>
                    <p>如有问题，欢迎随时和我联系</p>
                </div>
                <div className="footer">
                    <a // eslint-disable-line
                      className="confirm-btn"
                      onClick={() => {
                          closeApp(manifest.appid);
                      }}
                    >知道了</a>
                </div>
            </div>
        </DraggableArea>
    );
}, {
    appid: manifest.appid,
    initWidth: 360,
    initHeight: 320,
});
