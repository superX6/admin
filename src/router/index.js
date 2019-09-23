/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-12 10:18:22
 * @LastEditTime: 2019-09-23 14:33:17
 */
//引入动态加载
import AC from '../lib/asyncLoad' 

// 定义路由的对象数组
export default [
    {
        name: 'home',
        icon: 'home',
        path: '/',
        component: AC(() => import('../views/home/index.js'))//加载进来的是一个组件,也就是一个类
    },
    {
        name: 'login',
        path: '/login',
        component: AC(() => import('../views/user/login.js'))
    },
    {
        name: 'register',
        path: '/register',
        component: AC(() => import('../views/user/register.js'))
    },
    {
        name: 'admin',
        path: '/admin',
        component: AC(() => import('../views/admin'))
    },
    {
        name: 'outlined',
        path: '/outlined',
        component: AC(() => import('../views/outlined'))
    },
    {
        name: 'project',
        path: '/project',
        component: AC(() => import('../views/project'))
    },
    {
        name: 'about',
        path: '/about',
        component: AC(() => import('../views/about'))
    },
]