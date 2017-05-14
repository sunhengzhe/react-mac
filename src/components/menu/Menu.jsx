import React from 'react';
import { Menu, SubMenu, MenuItem, MenuItemGroup } from './MacMenu';

import Clock from './components/Clock';

export default () => (
    <Menu>
        <div className="pull-left">
            <SubMenu
              text={
                  <i
                    className="fa fa-apple"
                    aria-hidden="true"
                    style={{ fontSize: 16 }}
                  />
              }
            >
                <MenuItemGroup>
                    <MenuItem>关于本机</MenuItem>
                </MenuItemGroup>
                <MenuItemGroup>
                    <MenuItem>系统偏好设置...</MenuItem>
                    <MenuItem>App Store...</MenuItem>
                </MenuItemGroup>
                <MenuItemGroup>
                    <MenuItem>关机...</MenuItem>
                </MenuItemGroup>
            </SubMenu>
            <SubMenu
              text="Finder"
            >
                <MenuItemGroup>
                    <MenuItem>关于 Finder</MenuItem>
                </MenuItemGroup>
                <MenuItemGroup>
                    <MenuItem>偏好设置...</MenuItem>
                    <MenuItem>倾倒废纸篓...</MenuItem>
                </MenuItemGroup>
                <MenuItemGroup>
                    <MenuItem>服务...</MenuItem>
                </MenuItemGroup>
            </SubMenu>
            <SubMenu
              text="文件"
            >
                <MenuItemGroup>
                    <MenuItem>新建 Finder 窗口</MenuItem>
                    <MenuItem>新建文件夹</MenuItem>
                </MenuItemGroup>
            </SubMenu>
        </div>
        <div className="pull-right">
            <SubMenu text={<Clock />} />
            <SubMenu
              text={
                  <i className="fa fa-list-ul" aria-hidden="true" />
              }
            />
        </div>
    </Menu>
);
