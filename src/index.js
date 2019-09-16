/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-08-14 18:15:52
 * @LastEditTime: 2019-09-12 15:37:13
 */
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter} from 'react-router-dom'

import App from './App'  //路由的控制由app.js文件来完成

const rootElement = document.getElementById('root')


render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, rootElement)