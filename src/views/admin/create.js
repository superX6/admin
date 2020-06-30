import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import './create.scss'
import {message} from 'antd';
import http$ from '../../lib/axios';
// import Markdown from 'react-markdown';
import MdEditor from './mdEditor'
import { withRouter } from 'react-router-dom'



const { TextArea } = Input;
const { Option } = Select;

class CreateArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      essentials: ''
    }
    this.handleVal = this.handleVal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = e => {
   
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values, 'values')
        if(!this.state.content){
          message.warning('请输入文章内容');
          return
        }
        const {title, category, tags, essentials} = values;
        // const {content} = this.state;
        // console.log(this.state.content)
        http$.post('/createArticle', {
          'title': title,
          'content': this.state.content,
          'author': 'superx',
          'category': category,
          'tags': tags,
          'essentials': essentials,
          'create_time': new Date().getTime(),
          'update_time': new Date().getTime(),
        },{withCredentials: true }).then(data => {
          // console.log(data, 'res create')
          if(data.success === 'true'){
            message.success('发布成功');
            // console.log(this.props)
            this.props.history.push('/')
            // this.props.history.replace('/home')
          }
        })
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="create">
        <h2 className="title">用心记录文章</h2>
        <Form labelAlign="left" onSubmit={this.handleSubmit} {...formItemLayout}>     
           <Form.Item label="标题">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input your title!' }],
              })(
                <Input
                  placeholder="title" className="input-wrapper"
                />,
              )}
            </Form.Item>
            <Form.Item label="分类" hasFeedback>
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: 'Please select your country!' }],
                })(
                  <Select placeholder="选择文章分类" className="input-wrapper">
                    <Option value="javascript">javascript</Option>
                    <Option value="css">css</Option>
                    <Option value="node">node</Option>
                    <Option value="sql">sql</Option>
                    <Option value="other">other</Option>
                  </Select>,
                )}
              </Form.Item>

            <Form.Item label="标签">
              {getFieldDecorator('tags', {
                rules: [{ required: true, message: 'Please input your tags!' }],
              })(
                <Input
                  placeholder="tags" className="input-wrapper"
                />,
              )}
            </Form.Item>

            <Form.Item label="概述">
              {getFieldDecorator('essentials', {
                rules: [{ required: true, message: 'Please input your essentials!' }],
              })(
              <TextArea
                  placeholder="概述"
                  autosize={{ minRows: 3 }}
                />
              )}
            </Form.Item>
        <p style={{marginBottom: '10px'}}>文章内容：</p>
        <MdEditor className="md-editor" handleVal={this.handleVal} />
            <Form.Item className="btn" {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">发表</Button>
            </Form.Item>            
        </Form>
      </div>
    )
  }

  handleVal(value){
    // console.log(value, 'farther')
    this.setState({content: value});
  }
    
}
// 经 Form.create() 包装过的组件会自带 this.props.form 属性
export default withRouter(Form.create({ name: 'createArticle' })(CreateArticle));