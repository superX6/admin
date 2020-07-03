import React, {Component} from 'react'
import {Layout,   Row,  Col,} from 'antd'
import Nav from './nav'
import Nav2 from './nav2'
import Right from './right'
import './layout2.scss'



const { Header, Footer, Sider, Content } = Layout;



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
        {/* <Nav />    */}
        <Layout className = "layouts">
          <div className="l-header">
           <Nav2></Nav2>
           <div className="container info">
              <div className="title">移动端自适应方案</div>
              <div className="time"><i>Posted by superx on Jan 3, 2020</i></div>
           </div>
          </div>
          <Content className="l-content container">
            {this.props.children}
          </Content>  
          <Footer className="footer">          
            Stay Hungry. Stay Foolish. ©2019 Created by Superx
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default Layouts;