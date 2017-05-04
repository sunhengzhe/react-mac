import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import Menu from './components/menu/Menu';
import Dock from './containers/dock/Dock';
/* init state */
import INIT_STATE from './core/initState';

import reducers from './reducers';

import './index.css';
import bg from './images/sky.jpg';

/** store */
const store = createStore(reducers, INIT_STATE);

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
                    const App = require(`./${appid}`).default;
                    return <App
                        key={appid}
                        closeApp={closeApp}
                    />
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
