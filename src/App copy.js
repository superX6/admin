/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 15:19:40
 * @LastEditTime: 2019-09-17 15:52:07
 * @LastEditors: Please set LastEditors
 */
import React from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'

import routes from './router' //载入路由配置数组文件

import 'antd/dist/antd.css'
import './assets/css/common.scss'


// export default ({history}) => (
//   <Switch>
//     {
//       routes.map(({ name, path, exact = true, component }) =>(
//         <Route path={path} exact={exact} component={component} key={name} />        
//       ))
//     }
//   </Switch> 
//   )


export default ({history}) => (
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map(({ name, path, exact = true, component }) =>(
            <Route path={path} exact={exact} component={component} key={name} />        
          ))
        }
      </Switch>
    </ConnectedRouter>
 
  )