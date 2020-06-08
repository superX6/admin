import Layouts from './components/layouts/layouts'
import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import routes from './router' //载入路由配置数组文件
import 'antd/dist/antd.css'
import './assets/css/index.scss'

// console.log(Layouts, 99)



export default ({history}) => (
    <ConnectedRouter history={history}>
      <Switch>
        <Layouts>
          {
            routes.map(({ name, path, exact = true, component }) =>(
              <Route path={path} exact={exact} component={component} key={name} />        
            ))
          }
        </Layouts>
      </Switch>
    </ConnectedRouter>
 
  )