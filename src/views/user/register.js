/*
 * @Descripttion:  register
 * @Author: xiancq
 * @Date: 2019-09-12 10:56:48
 * @LastEditTime: 2019-09-16 14:40:46
 */
import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.scss'
import http$ from '../../lib/axios';
import {message} from 'antd';



class registerForm extends Component {
  constructor (props){
    super(props)
    // console.log('props是:', props)
  }
   handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // http$.get('/admin2').then(data => {console.log(data)})
        http$.post('/register', {
          username: values.username,
          password: values.password
        },{withCredentials: true }).then(data => {
          if(data.success === 'true'){
            message.success('注册成功');
            this.props.history.push('login')
          }
          console.log(data, 'register response')
        })
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'wrapper'}>
        <div className={'box'}>
        <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                register
              </Button>
              Or <a onClick={() => this.props.history.push('/login')}>Login now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'register' })(registerForm);