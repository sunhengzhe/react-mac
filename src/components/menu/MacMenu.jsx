import React from 'react';
import PropTypes from 'prop-types';
import './menu.css';

/** 菜单 */
const Menu = ({
    children,
}) => (
    <div className="menu">
        { children }
    </div>
);

Menu.propTypes = {
    children: PropTypes.any, // eslint-disable-line
};

/** 子菜单 */
const SubMenu = ({
    padding,
    text,
    children,
}) => (
    <div className="submenu">
        <a className={`menu-btn padding-${padding}`}>
            { text }
        </a>
        <ul className="dropdown">
            { children }
        </ul>
    </div>
);

SubMenu.propTypes = {
    padding: PropTypes.number,
    text: PropTypes.any, // eslint-disable-line
    children: PropTypes.any, // eslint-disable-line
};

SubMenu.defaultProps = {
    padding: 10,
};

/** 子菜单组 */
const MenuItemGroup = ({
    children,
}) => (
    <li className="group">
        { children }
    </li>
);

MenuItemGroup.propTypes = {
    children: PropTypes.any, // eslint-disable-line
};

/** 子菜单项 */
const MenuItem = ({
    onClick,
    children,
}) => (
    <a // eslint-disable-line
      className="menu-item" onClick={onClick}
    >{ children }</a>
);

MenuItem.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any, // eslint-disable-line
};

MenuItem.defaultProps = {
    onClick: () => {},
};

export {
    Menu,
    SubMenu,
    MenuItem,
    MenuItemGroup,
};
