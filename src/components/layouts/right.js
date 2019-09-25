/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-23 10:30:59
 * @LastEditTime: 2019-09-25 11:09:09
 */
import React, { Component } from 'react';
import {
  Layout,
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