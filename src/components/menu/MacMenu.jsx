import React from 'react';
import './menu.css';

const Menu = ({
    children,
}) => {
    return (
        <div className="menu">
            { children }
        </div>
    )
};

const SubMenu = ({
    padding = 10,
    text,
    children,
}) => {
    return (
        <div className="submenu">
            <a className={`menu-btn padding-${padding}`}>
                { text }
            </a>
            <ul className="dropdown">
                { children }
            </ul>
        </div>
    )
}

const MenuItemGroup = ({
    children,
}) => {
    return (
        <li className="group">
            { children }
        </li>
    )
}

const MenuItem = ({
    onClick,
    children,
}) => {
    return (
        <a className="menu-item" onClick={onClick}>{ children }</a>
    )
};

export {
    Menu,
    SubMenu,
    MenuItem,
    MenuItemGroup,
};