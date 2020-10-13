/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-17 09:28:06
 * @LastEditTime: 2020-10-13 11:06:43
 */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { user } from './module/user';
import { home } from './module/home';
import { articles } from './module/articles';

const rootReducer = history =>
  combineReducers({
    user,
    home,
    articles,
    router: connectRouter(history),
  });

export default rootReducer;
