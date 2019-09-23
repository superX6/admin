/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-08-14 18:15:52
 * @LastEditTime: 2019-09-23 09:37:05
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { BrowserRouter} from 'react-router-dom'

import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configureStore'
import App from './App'  //路由的控制由app.js文件来完成


const store = configureStore()

// console.log(store, 'store')


const rootElement = document.getElementById('root')


// render(
//   <BrowserRouter>
//     <App/>
//   </BrowserRouter>, rootElement)


render(
  <Provider store={store}>
    <App history={history} />
  </Provider>, 
  rootElement
)

serviceWorker.unregister();
