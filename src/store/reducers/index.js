/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-17 09:28:06
 * @LastEditTime: 2019-09-17 09:28:06
 */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { user } from './module/user';
import { articles } from './module/articles';

const rootReducer = history =>
  combineReducers({
    user,
    articles,
    router: connectRouter(history),
  });

export default rootReducer;
