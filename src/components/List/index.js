/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 18:15:52
 * @LastEditTime: 2019-08-15 15:47:09
 * @LastEditors: Please set LastEditors
 */
import React, {Component} from 'react'
import Button from 'antd/es/button'
import { DatePicker } from 'antd';
import Item from './item'

class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      lists: [
        {id: 1, label: '测试1'},
        {id: 2, label: '测试2'},
        {id: 3, label: '测试3'},
      ]
    }
  }
  // props
  render(){
    // console.log(this.state.lists)
    const {lists} = this.state
    return (
      <div>
        <Button type="primary">Button</Button>
        {       
          lists.map((it) => (
            <Item 
              key={it.id} 
              label={it.label}
            />
          ))
        }
      </div>
    )
  }
}

export default List

/**
 * Babel 会把JSX转译为一个名为React.createElement()函数调用
 */
