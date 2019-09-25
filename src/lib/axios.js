/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:10:50
 * @LastEditTime: 2019-09-25 16:47:49
 * @LastEditors: Please set LastEditors
 */

import axios from 'axios';
// import qs from 'qs'

let http$ = axios.create({
    baseURL: '/', // 这里是本地admin启动的服务地址
    timeout: 5000 // request timeout
})
// http$.interceptors.request.use(config => {
//     if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
//         if (typeof(config.data) !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
//             config.data = qs.stringify(config.data)
//         }
//     }
//     return config
// }, error => {
//     Promise.reject(error)
// })

http$.interceptors.response.use(async data => {
    const result = data.data;
    // console.log(result, 'result')
    return result
    if(result.success === "true"){
        return result
    }else{
        alert('request error')
        return
    }
    
   
}, error => {
    if (error.response) {
        if (error.response.status === 500) {
            console.log('服务器错误，请联系管理员处理')
        }
        return Promise.reject(error.response.data)
    } else {
        return Promise.reject(error)
    }
})
export default http$

