/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-12 10:56:48
 * @LastEditTime: 2020-06-10 18:05:33
 */
import React, { Component } from 'react'
import http$ from '../../lib/axios';
import { Table, Divider, Tooltip,  Tag } from 'antd';

export default class ArticleTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      articleList: []
    }
    this.getList = this.getList.bind(this);
  }

  componentDidMount(){
    this.getList()
  }

  render(){
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
        onCell: () => {
          return {
            style: {
              maxWidth: 250,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow:'ellipsis',
              cursor:'pointer'
            }
          }
        },
        render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick = {() => this.props.historys.push(`/detail/${record.id}`)}>详情</a>
            <Divider type="vertical" />
            <a>Delete</a>
          </span>
        ),
      },
    ];
    
  
    return (
      <div>
        <Table columns={columns} dataSource={this.state.articleList} rowKey='id' />
      </div>
    )
  }

  getList(){
    http$.get('/articles', {withCredentials: true }).then(data => {
      // console.log(data, 'data')
      const articleList = data.list || [];
      this.setState({
        articleList
      })
    })
  }
}