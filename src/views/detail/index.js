import React, { Component } from "react";
import http$ from '../../lib/axios';
import marked from 'marked';
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';


export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      res: {
        content: 'ww'
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
        <div dangerouslySetInnerHTML = {{__html: marked(this.state.res.content )}}></div>
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
