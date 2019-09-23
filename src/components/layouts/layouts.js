/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-16 15:24:00
 * @LastEditTime: 2019-09-23 14:31:30
 */
import React, {Component} from 'react'
import {Layout, BackTop} from 'antd'
import Nav from './nav'
import Right from './right'
import './layout.scss'



const { Content, Footer, Sider } = Layout;



class Layouts extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render(){
    return (
      <div className="layout-wrapper">
        <Nav />
        <Layout className = "layouts container">
          <Content className="content">
            {this.props.children}
          </Content>
          <Right className="sider" />
        </Layout>
        <Footer className="footer">          
          Stay Hungry. Stay Foolish. ©2019 Created by Superx
        </Footer>
      </div>
    )
  }
}

export default Layouts;