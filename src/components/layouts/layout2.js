import React, {Component} from 'react'
import {Layout,   Row,  Col,} from 'antd'
import Nav from './nav'
import Nav2 from './nav2'
import Right from './right'
import './layout2.scss'
import { connect } from "react-redux";
import routes from '../../router' //载入路由配置数组文件




const { Header, Footer, Sider, Content } = Layout;



class Layouts extends Component {
  constructor(props){
    super(props);
  }
 
  render(){
    // 登录注册路由时 处理
    const isUserPage = ['/login', '/register'].includes(this.props.location.pathname)
    const isHome = ['/home'].includes(this.props.location.pathname)
    if(isUserPage){
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
    if(isHome){
      return (
        <div className="layout-wrapper">
        <Layout className = "layouts">
          <div className="l-header">
           <Nav2></Nav2>     
           <div className="container info">
               <div className="title">网络日志</div>
              <div className="time"><i>前方的路</i></div>
           </div>
          </div>
          <Content className="l-content container">
            {this.props.children}
          </Content>  
          <Footer className="footer">          
           
          </Footer>
        </Layout>
      </div>
      )
    }
    return (
      <div className="layout-wrapper">
        <Layout className = "layouts">
          <div className="l-header">
           <Nav2></Nav2>     
           <div className="container info">
              <div className="title">{this.props.title}</div>
              <div className="time"><i>{this.props.subTitle}</i></div>
           </div>
          </div>
          <Content className="l-content container">
            {this.props.children}
          </Content>  
          <Footer className="footer"></Footer>
        </Layout>
      </div>
    )
  }
  componentDidMount(){
    this.props.setTitle('网络日志')
    this.props.setSubTitle('Stay Hungry. Stay Foolish.')
  }
}

function mapStateToProps(state) {
  return {
    title: state.home.title,
    subTitle: state.home.subTitle,
    count: state.home.count,
  }
}
// export default Layouts;
function mapDispatchToProps(dispatch) {
  return {
      setTitle: tag => { dispatch({type:'SET_BANNER_TITLE', title: tag})},
      setSubTitle: tag => { dispatch({type:'SET_BANNER_SUBTITLE', subTitle: tag})},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layouts)
