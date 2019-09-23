/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-23 10:30:59
 * @LastEditTime: 2019-09-23 10:38:56
 */
import React, { Component } from 'react';
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

const { Sider } = Layout;

class Right extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
  }

  render() {
    return (
      <div className="sider">
        <Sider>sider</Sider>
      </div>
    )
  }

}

export default Right;