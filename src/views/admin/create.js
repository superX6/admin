/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-24 09:35:19
 * @LastEditTime: 2019-09-24 17:47:24
 */
import React, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import './create.scss'
import {message} from 'antd';
import http$ from '../../lib/axios';
import Markdown from 'react-markdown';


const { TextArea } = Input;
const { Option } = Select;

class CreateArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: ''
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values, 'values')
        const {title, category, tags, content} = values;
        http$.post('/createArticle', {
          'title': title,
          'content': content,
          'author': 'superx',
          'category': category,
          'tags': tags,
          'create_time': new Date().getTime(),
          'update_time': new Date().getTime(),
        },{withCredentials: true }).then(data => {
          // console.log(data, 'res create')
          if(data.success === 'true'){
            message.success('发布成功');
            this.props.history.push('home')
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
        sm: { span: 4 },
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
    const source = '## 只求极致222\n' +
      '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
      '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n' +
       '**这是加粗的文字**\n' +
      '*这是倾斜的文字*`\n' +
      '***这是斜体加粗的文字***\n' +
      '~~这是加删除线的文字~~ \n'+
      '> aaaaaaaaa\n' +
      '>> bbbbbbbbb\n' +
      '>>> cccccccccc\n'+
      '***\n' +
      '*****';
    return (
      <div className="create">
        {/* <Form onSubmit={this.handleSubmit} {...formItemLayout}>
     
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
                  <Select placeholder="选择文章分类">
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

            <Form.Item label="内容">
              {getFieldDecorator('content', {
                rules: [{ required: true, message: 'Please input your content!' }],
              })(
              <TextArea
                  placeholder="content"
                  autosize={{ minRows: 3 }}
                />
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                发表
              </Button>
            </Form.Item>            
        </Form>
        <p>markdowm</p> */}
        <Markdown source={source} />,
      </div>
    )
  }
}
// 经 Form.create() 包装过的组件会自带 this.props.form 属性
export default Form.create({ name: 'createArticle' })(CreateArticle);