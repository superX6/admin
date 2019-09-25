/*
 * @Descripttion:  markdown 编辑器
 * @Author: xiancq
 * @Date: 2019-09-25 09:25:45
 * @LastEditTime: 2019-09-25 11:18:35
 */
import React, { Component } from 'react'
import http$ from '../../lib/axios';
import {message} from 'antd';
import Editor from 'for-editor'



class MdEditor extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    this.props.handleVal(value)
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    return <Editor value={value} onChange={(value) => this.handleChange(value)} />
  }
}


export default MdEditor;
