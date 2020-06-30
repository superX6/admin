import React, { Component } from "react";
import { Row, Col, Affix } from "antd";
import http$ from '../../lib/axios';
import marked from 'marked';
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';



export default class Detail extends Component {
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
  componentDidMount(){
    this.initMd();
    this.getList();
  }

  render() {
    return (
      <div> 
        <Row>
          <Col span={18}>
            <div dangerouslySetInnerHTML = {{__html: marked(this.state.res.content )}}></div>
          </Col>
          <Col span={6}>
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
          </Col>
        </Row>
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
