/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-16 15:31:24
 * @LastEditTime: 2019-09-23 14:53:38
 */
import React, { Component } from 'react';
import logo from '../../assets/img/logo.jpg';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {
  Layout,
  Icon,
  Menu,
  Row,
  Col,
  Button,
  Drawer,
  message,
  Avatar,
} from 'antd';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      isMobile: false,
      visible: false,
      placement: 'top',
      current: null,
      menuCurrent: '',
      login: false,
      register: false,
      nav: '首页',
      navTitle: '首页',
      code: '',
      isLoading: false,
    };
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('trriger componentWillReceiveProps', nextProps)
    this.initMenu(nextProps.pathname);
  }
  
  initMenu(name) {
    let key = '1';
    let navTitle = '';
    if (name === '/') {
      key = '1';
      navTitle = '首页';
    } else if (name === '/admin') {
      key = '2';
      navTitle = '管理';
    } else if (name === '/outlined') {
      key = '3';
      navTitle = '归档';
    } else if (name === '/project') {
      key = '4';
      navTitle = '项目';
    } else if (name === '/about') {
      key = '5';
      navTitle = '关于';
    }    
    // this.setState({
    //   navTitle,
    //   menuCurrent: key,
    // });
  }


  handleMenu = e => {
    // console.log('click ', e.key);
    this.setState({
      menuCurrent: e.key,
    });
  };

  render(){
    return (
      <div className="nav clearfix">
        <div className="container">
        <div className="logo fl"  />
        <Menu
            className="menu fl"
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            onClick={this.handleMenu}
            selectedKeys={[this.state.menuCurrent]}
            style={{ lineHeight: '64px', borderBottom: 'none' }}
          >
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" theme="outlined" />
                首页
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin">
                <Icon type="ordered-list" theme="outlined" />
                管理
              </Link>
            </Menu.Item>        
            <Menu.Item key="3">
              <Link to="/outlined">
                <Icon type="project" theme="outlined" />
                归档
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/project">
                <Icon type="database" theme="outlined" />
                项目
              </Link>
            </Menu.Item>           
            <Menu.Item key="5">
              <Link to="/about">
                <Icon type="user" theme="outlined" />
                关于
              </Link>
            </Menu.Item>
          </Menu>      
        </div>
      </div>
    )
  }

}

export default Nav