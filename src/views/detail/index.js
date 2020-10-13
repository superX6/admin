import React, { Component } from "react";
import { Row, Col, Affix } from "antd";
import http$ from '../../lib/axios';
import marked from 'marked';
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import "./detail.scss";
import { connect } from "react-redux";
import moment from "moment";
// import {setRouteLeaveHook} from 'react-router'


class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      res: {
        content: ''
      },
      renderer: new marked.Renderer()
    }
    this.getList = this.getList.bind(this);
  }
  routerWillLeave(nextLocation){
    // console.log('router will go to '+nextlocation)       
    return true
  }
  componentDidMount(){
    this.initMd();
    this.getList();
    // this.props.router.setRouteLeaveHook(this.props.routes, this.routerWillLeave)
  }

  render() {
    return (
      <div className="detail"> 
        <div className="detail-content fl">
           <div dangerouslySetInnerHTML = {{__html: marked(this.state.res.content )}}></div>
        </div>
        <div className="detail-menu fr">
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
              className="article-menu"
              source={this.state.res.content}
              headingTopOffset={80}
            />
            </div>
          </Affix>
        </div>
      </div>
    );
  }
  getList(){
    http$.get('/getArticles', {
        withCredentials: true,
        params: {
          id: this.props.match.params.id
        }
    }).then(data => {
      console.log(data, 'data')
      if(data.list.length > 0){
        const res = data.list[0] || [];
        this.setState({
          res
        })
        this.props.setTitle(res.title)
        this.props.setSubTitle(`POST ON ${moment(Number(res.create_time)).format("YYYY-MM-DD")}.  BY ${res.author}`)
      }
    })
  }
  initMd(){
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    }); 
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
)(Detail)