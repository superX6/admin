
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
        name: 'create',
        path: '/admin/create',
        component: AC(() => import('../views/admin/create'))
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
    {
        name: 'test',
        path: '/test',
        component: AC(() => import('../views/test'))
    },
]