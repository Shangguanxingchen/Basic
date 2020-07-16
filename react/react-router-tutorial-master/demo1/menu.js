import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

// 这两个是变量声明是 ant 组件需要
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// 左侧菜单模板取自于 ant.design 组件库 用了MENU 的一个组件只在‘选项一’和‘选项二’做了配置路由
const MenuListDom = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: []
        };
    },
    handleClick(e) {
        window.location.hash = e.key; // 被点击元素的‘key’的值‘about’就是页面跳转的路径
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1)
        });
    },
    onToggle(info) {
        console.log('onToggle', info)
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    },
    render: function(){
        return (
            < Menu onClick = {this.handleClick}
                style = {{width: 240}}
                openKeys = {this.state.openKeys}
                onOpen = {this.onToggle}
                onClose = {this.onToggle}
                selectedKeys = {[this.state.current]}
                mode = "inline"
            >
                < SubMenu key = "sub1" title = { 
                    < span > 
                        < Icon type = "mail" / > 
                        < span > 导航一 < /span>
                    </span >
                }>
                    < Menu.Item key = "about" >  /*about就是将要被跳转的路径*/
                        选项1
                    < /Menu.Item> 
                    < Menu.Item key = "users" >
                        选项2
                    < /Menu.Item> 
                    < Menu.Item key = "3" > 选项3 < /Menu.Item> 
                    < Menu.Item key = "4" > 选项4 < /Menu.Item> 
                < /SubMenu> 
                < SubMenu key = "sub2" title = { 
                    < span > 
                        < Icon type = "appstore" / > 
                        < span > 导航二 < /span>
                    </span >
                } >
                    < Menu.Item key = "5" > 选项5 < /Menu.Item> 
                    < Menu.Item key = "6" > 选项6 < /Menu.Item> 
                    < SubMenu key = "sub3" title = "三级导航" >
                        < Menu.Item key = "7" > 选项7 < /Menu.Item> 
                        < Menu.Item key = "8" > 选项8 < /Menu.Item> 
                    < /SubMenu> 
                < /SubMenu> 
                < SubMenu key = "sub4" title = { 
                    < span > 
                        < Icon type = "setting" / > 
                        < span > 导航三 < /span>
                    </span >
                } >
                    < Menu.Item key = "9" > 选项9 < /Menu.Item> 
                    < Menu.Item key = "10" > 选项10 < /Menu.Item> 
                    < Menu.Item key = "11" > 选项11 < /Menu.Item> 
                    < Menu.Item key = "12" > 选项12 < /Menu.Item> 
                < /SubMenu> 
            < /Menu>
        )
    }
});

// 定义了要输出的类 MenuList （这个要用于路由配置中）
export default class MenuList extends Component {
    render() {
        return (
            <div> // 这是body 下的 页面最外层 div 
                <div id="react-menu">  // 这是左侧菜单的最外层div
                    <div className="logo">Hell Logo</div>
                    <MenuListDom location={this.props.location} /> // 这里是 ant UI组件显示的地方
                </div>
                <div id="react-content"> // 显示区域
                    {this.props.children}
                </div>
                <div id="react-top"></div> // 顶部登录状态显示区域
            </div>
        );
    }
};