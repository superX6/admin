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
    // this.initMenu(nextProps.pathname);
  }


  handleMenu = e => {
    this.setState({
      menuCurrent: e.key,
    });
  };

  render(){
    return (
      <div className="nav clearfix">
        {/* <div className="container"> */}
        {/* <div className="logo fl">  BLOG        </div> */}

        
              
        <Menu
              className="menu fr"
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              onClick={this.handleMenu}
              selectedKeys={[this.state.menuCurrent]}
              style={{ lineHeight: '64px', borderBottom: 'none' }}
            >
              <Menu.Item key="1">
                <Link to="/home">
                  <Icon type="home" theme="outlined" />
                  HOME
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about">
                  <Icon type="ordered-list" theme="outlined" />
                  ABOUT
                </Link>
              </Menu.Item>        
              <Menu.Item key="3">
                <Link to="/tags">
                  <Icon type="project" theme="outlined" />
                  TAGS
                </Link>
              </Menu.Item>        
            </Menu>
        </div>
      
    )
  }

}

export default Nav