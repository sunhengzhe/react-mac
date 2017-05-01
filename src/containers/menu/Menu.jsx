import React from 'react';
import { Menu, SubMenu, MenuItem, MenuItemGroup } from '../../components/menu/Menu';
export default () => {
    return (
        <Menu>
            <SubMenu
                text={
                    <i
                        className="fa fa-apple"
                        aria-hidden="true"
                        style={{ fontSize: 16 }}
                    ></i>
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
        </Menu>
    )
}
