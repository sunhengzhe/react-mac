import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Main from './containers/Main';
/* init state */
import INIT_STATE from './core/initState';
import reducers from './reducers';
import './index.css';

/** store */
const store = createStore(reducers, INIT_STATE);

/** 禁止拖曳 */
document.onselectstart = function (e) {
    e.returnValue = false;
};

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root'),
);
