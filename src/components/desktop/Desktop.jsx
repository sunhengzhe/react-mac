import React, { Component } from 'react';
import PropTypes from 'prop-types';
import appIcon from '../../images/appstore.png';
import welcome from '../app/welcome/manifest';
import './desktop.css';

/** 桌面 */
class Desktop extends Component {

    static propTypes = {
        // 当前打开 APP 数组
        openedApps: PropTypes.arrayOf(PropTypes.string).isRequired,
        // 打开 app
        openApp: PropTypes.func.isRequired,
        // 添加通知
        addNotification: PropTypes.func.isRequired,
        // 当前屏幕数
        screens: PropTypes.shape().isRequired,
        // 添加屏幕
        addScreen: PropTypes.func.isRequired,
        goPrevScreen: PropTypes.func.isRequired,
        goNextScreen: PropTypes.func.isRequired,

    }

    componentDidMount() {
        const { goPrevScreen, goNextScreen, openApp, addNotification } = this.props;
        document.addEventListener('keydown', (e) => {
            const { keyCode, shiftKey } = e;

            if (keyCode === 188 && shiftKey) {
                // prev
                goPrevScreen();
            } else if (keyCode === 190 && shiftKey) {
                // next
                goNextScreen();
            }
        });

        /** 新功能提示 */
        const hasCheckedUpdate = !!localStorage.getItem('checked-update-info');
        if (hasCheckedUpdate) {
            addNotification({
                icon: appIcon,
                title: '新版本更新',
                content: '添加了若干新的功能，点击查看',
                onClick: () => {
                    openApp(welcome.appid);
                },
            });
        }
    }

    addFullScreen = (appid) => {
        const { addScreen, screens, addNotification } = this.props;
        addScreen(appid);
        if (screens.apps.length === 0) {
            // 打开第一个全屏 app 时提示
            addNotification({
                title: '屏幕间切换快捷键',
                content: '< 上一屏幕 > 下一屏幕',
                icon: appIcon,
            });
        }
        return screens.apps.length + 1;
    }

    render() {
        const { openedApps, screens } = this.props;
        return (
            <div
              className="desktop"
              style={{
                  transform: `translateX(-${screens.curIndex * 100}%)`,
                  MozTransform: `translateX(-${screens.curIndex * 100}%)`,
                  WebkitTransform: `translateX(-${screens.curIndex * 100}%)`,
              }}
            >
                {
                    openedApps.map((appid) => {
                        // 展示所有打开的 APP
                        const App = require(`../../${appid}`).default;
                        return (
                            <App
                              key={appid}
                              fullScreen={this.addFullScreen}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default Desktop;
