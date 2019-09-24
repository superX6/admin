/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-12 10:56:48
 * @LastEditTime: 2019-09-24 17:07:46
 */
import React, { Component } from 'react'
import http$ from '../../lib/axios';
import Subassembly from '../../components/Subassembly';
import { Row, Col } from 'antd';
import './home.scss'
import moment from 'moment'


export default class Home extends Component {
  constructor (props){
    super(props);
    this.state = {
      articleList : []
    }
    this.getList = this.getList.bind(this)
  }

  componentDidMount(){
    this.getList();
  }
  getList(){
    http$.get('/articles', {withCredentials: true }).then(data => {
      console.log(data, 'data')
      const articleList = data.list || [];
      this.setState({
        articleList
      })

    })
  }
  render(){
    return (
      <div>
         {
           this.state.articleList.map((list, index) => {
             return (
              <Row key={index} className="article-list">
                <Col span={19}>
                  <h3>{list.title}</h3>
                  <div className="art_detail">{list.content}</div>
                  <p>
                    <Subassembly label="views" info="66" />
                    <Subassembly label="comment" info="0" />
                    <Subassembly label="start" info="6" />
                    <Subassembly info={moment().format('YYYY-MM-DD')} />
                  </p>
                </Col>
                <Col span={15}></Col>
              </Row>
             )
           })
         }
      </div>
    )
  }
}