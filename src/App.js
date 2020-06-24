/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 15:19:40
 * @LastEditTime: 2020-06-10 18:04:15
 * @LastEditors: Please set LastEditors
 */
import Layouts from './components/layouts/layouts'
import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import routes from './router' //载入路由配置数组文件
import 'antd/dist/antd.css'
import './assets/css/index.scss'


export default ({history}) => (
    <ConnectedRouter history={history}>
      <Switch>
        <Layouts>
          {
            routes.map(({ name, path, exact = true, component }) =>{
              // console.log(path)
              if(path === '/detail'){
                return <Route path="/detail/:id" exact={exact} component={component}  key={name} /> 
              }
              return  <Route path={path} exact={exact} component={component}  key={name} />     
            })
          }
        </Layouts>
      </Switch>
    </ConnectedRouter>
 
  )