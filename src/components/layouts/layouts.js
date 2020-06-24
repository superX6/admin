/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-16 15:24:00
 * @LastEditTime: 2020-06-10 14:23:28
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
        <Right className="sider" />
          <Content className="content">
            {this.props.children}
          </Content>
   
        </Layout>
        <Footer className="footer">          
          Stay Hungry. Stay Foolish. ©2019 Created by Superx
        </Footer>
      </div>
    )
  }
}

export default Layouts;