import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { BrowserRouter} from 'react-router-dom'
import 'lib-flexible'
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configureStore'
import App from './App'  //路由的控制由app.js文件来完成


const store = configureStore()


const rootElement = document.getElementById('root')



render(
  <Provider store={store}>
    <App history={history} />
  </Provider>, 
  rootElement
)

serviceWorker.unregister();
