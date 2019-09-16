/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-12 10:18:22
 * @LastEditTime: 2019-09-16 14:36:01
 */
//引入动态加载
import AC from '../lib/asyncLoad' 

// 定义路由的对象数组
export default [
    {
        name: '首页',
        icon: 'home',
        path: '/',
        component: AC(() => import('../views/home/index.js'))//加载进来的是一个组件,也就是一个类
    },
    {
        name: '登录',
        path: '/login',
        component: AC(() => import('../views/user/login.js'))
    },
    {
        name: '注册',
        path: '/register',
        component: AC(() => import('../views/user/register.js'))
    },
]