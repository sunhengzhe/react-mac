import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import Menu from './containers/menu/Menu';
import Dock from './containers/dock/Dock';
/* apps */
import Finder from './components/app/finder/manifest';
import Launchpad from './components/app/launchpad/manifest';
import Chrome from './components/app/chrome/manifest';
import ITerm from './components/app/iTerm/manifest';
import Music from './components/app/music/manifest';
import Firefox from './components/app/firefox/manifest';
import Intro from './components/app/intro/manifest';

import reducers from './reducers';

import './index.css';
import bg from './images/sky.jpg';

/** store */
const store = createStore(reducers, {
    dockApps: [
        Intro,
        Finder,
        Launchpad,
        Chrome,
        ITerm,
        Music,
        Firefox,
    ],
});

/** 主程序入口 */
const Main = connect(
    (state) => ({
        openedApps: state.openedApps
    }),
    (dispatch) => ({
        closeApp: (appid) => {
            dispatch({
                type: 'CLOSE_APP',
                appid,
            })
        }
    })
)(({
    openedApps,
    closeApp,
}) => {
    return (
        <div className="App">
            <Menu />
            <Dock />
            {
                openedApps.map((appid) => {
                    const App = require(`./components/app/${appid}`).default;
                    return <App key={appid} closeApp={closeApp} />
                })
            }
        </div>
    );
});

document.body.style.backgroundImage = `url(${bg})`;
document.body.style.backgroundSize = 'cover';
document.onselectstart = function (e) {
    e.returnValue = false;
};

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
