import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import Main from './containers/Main';
/* init state */
import INIT_STATE from './core/initState';
import reducers from './reducers';
import './index.css';
import bg from './images/sky.jpg';


/** store */
const store = createStore(reducers, INIT_STATE);

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
