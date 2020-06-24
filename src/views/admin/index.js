/*
 * @Descripttion:  管理： 文章分类管理， 标签管理， 分类管理 做成tab
 * @Author: xiancq
 * @Date: 2019-09-23 11:38:31
 * @LastEditTime: 2020-06-10 16:42:06
 */
import React, { Component } from 'react'
import { Tabs, Button } from 'antd';
import ArticleTable from './articleTable'

const { TabPane } = Tabs;



export default class Admin extends Component {
constructor(props){
  super(props);
  this.toCreate = this.toCreate.bind(this)
}

render(){
  const operations = <Button onClick={this.toCreate}>创建文章</Button>;
  return (
    <Tabs tabBarExtraContent={operations}>
    <TabPane tab="文章管理" key="1">
      <ArticleTable historys={this.props.history}></ArticleTable>
    </TabPane>
    <TabPane tab="分类管理" key="2">
      Content of tab 2
    </TabPane>
    <TabPane tab="标签管理" key="3">
      Content of tab 3
    </TabPane>
  </Tabs>
   )
  }
  toCreate(){
    this.props.history.push('/admin/create')
  }


}
