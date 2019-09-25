/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-16 15:24:00
 * @LastEditTime: 2019-09-25 16:21:01
 */
import React, {Component} from 'react'
import {Layout} from 'antd'
import Nav from './nav'
import Right from './right'
import './layout.scss'



const { Content, Footer } = Layout;



class Layouts extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    // 登录注册路由时 处理
    const isUserPage = ['/login', '/register'].includes(this.props.location.pathname)
    if(isUserPage){
      return (
        <div>
          {this.props.children}
        </div>
      )
    }

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