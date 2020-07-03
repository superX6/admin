import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload
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
      bannerPath: '',
      essentials: ''
    }
    this.handleVal = this.handleVal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = e => {   
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(!this.state.content){
          message.warning('请输入文章内容');
          return
        }
        const {title, category, tags, essentials} = values;
        console.log(values ,'val')
        http$.post('/createArticle', {
          'title': title,
          'content': this.state.content,
          'author': 'superx',
          'category': category,
          'tags': tags,
          'bannerPath': this.state.bannerPath,
          'essentials': essentials,
          'create_time': new Date().getTime(),
          'update_time': new Date().getTime(),
        },{withCredentials: true }).then(data => {
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
    const uploadProps = {
      name: 'file',
      action: '/md/upload',
      onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          this.setState({
            bannerPath: info.file.response.filename,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div className="create panel">
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
              <p>{this.state.bannerPath}</p>
            <Form.Item label="banner图">
              {getFieldDecorator('bannerPath', {
                rules: [{ required: true, message: 'Please upload your banner!' }],
              })(
                <Upload {...uploadProps} onChange={this.handleChange}>
                  <Button> 上传图片</Button>
                </Upload>
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
        <MdEditor className="md-editor" handleVal={this.handleVal} />
            <Form.Item className="btn" {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">发表</Button>
            </Form.Item>            
        </Form>
      </div>
    )
  }

  handleVal(value){
    this.setState({content: value});
  }
  handleChange(info) {   
    if (info.file.status === 'done') {
      const path = info.fileList[0].response.filename;
      console.log(path, 'done')
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        bannerPath: path,
      });
      console.log(this.state, 99)
    } else if (info.fileList[0].status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
    
}
// 经 Form.create() 包装过的组件会自带 this.props.form 属性
export default withRouter(Form.create({ name: 'createArticle' })(CreateArticle));