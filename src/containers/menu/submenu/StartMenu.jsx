import React from 'react';

import './subMenu.css';

export default ({

}) => {
    return (
        <div className="submenu">
            <a className="menu-btn padding-10">
                <i className="fa fa-apple" aria-hidden="true" style={{ fontSize: 16 }}></i>
            </a>
            <ul className="dropdown">
                <li className="group">
                    <a className="menu-item">关于本机</a>
                </li>
                <li className="group">
                    <a className="menu-item">系统偏好设置...</a>
                    <a className="menu-item">App Store...</a>
                </li>
                <li className="group">
                    <a className="menu-item">强制退出...</a>
                </li>
            </ul>
        </div>
    )
}
