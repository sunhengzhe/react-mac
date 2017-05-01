import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import bg from './images/sky.jpg';
import './index.css';
import Menu from './containers/menu/Menu';
import Dock from './components/dock/Dock';

import Intro from './components/app/intro/Intro';

class App extends Component {

    render() {
        return (
          <div className="App">
            <Menu />
            <Dock />
            <Intro />
          </div>
        );
    }
}

document.body.style.backgroundImage = `url(${bg})`;
document.body.style.backgroundSize = 'cover';
document.onselectstart = function (e) {
    e.returnValue = false;
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
