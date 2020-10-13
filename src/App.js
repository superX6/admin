import Layout2 from './components/layouts/layout2'
import React from 'react'
import { Route, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'
import routes from './router' //载入路由配置数组文件
import 'antd/dist/antd.css'
import './assets/css/index.scss'

console.log(Route, 'router')


export default ({history}) => (
    <ConnectedRouter history={history}>
      <Switch>
        <Layout2>
          {
            routes.map(({ name, path, exact = true, component }) =>{
              if(path === '/detail'){
                return <Route path="/detail/:id" exact={exact} component={component}  key={name} /> 
              }
              return  <Route path={path} exact={exact} component={component}  key={name} />     
            })
          }
        </Layout2>
      </Switch>
    </ConnectedRouter>
 
  )