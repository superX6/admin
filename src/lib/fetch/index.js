/*
 * @Descripttion:   
 * @Author: xiancq
 * @Date: 2019-09-27 17:45:32
 * @LastEditTime: 2019-09-27 17:45:32
 */
/**
 *  @author liuqiao
 *  @date   2019/07/19
 *  @description  
 *          使用原生fetch取代以前项目的axios
 *                1.支持get,post
 *                2.支持针对单个url开启缓存
 *                3.支持全局针对request和response开启拦截
 *                4.支持设置请求超时时间
 *                5.完整的错误反馈（包括网络错误，超时错误，后台json解析错误，拦截器终止流程）
 *                6.支持全局配置ctFetch请求行为(请求参数)，也支持局部使用覆盖全局配置
 *                
 *                
 *          post使用说明：
 *                1.需传递配置对象options:
 *                    {
 *                        method: "POST", 
 *                        data?: Object | 序列化好的字符串，
 *                        transferType?: 'form' | 'url' | 'json',
 *                        headers?:{
 *                            'Content-Type'?: String
 *                        }
 *                     }
 *                     
 *                2.通过transferType标示要传的数据类型：
 *                  1.1 transferType为form，表示请求体 body使用FormData形式上传，可以传文件或者普通数据
 *                  1.2 transferType为url(默认方式)，表示请求体 body使用a=b&c=d形式上传，可以传普通数据    
 *                  1.3 transferType为json，表示 请求体 body使用 {"a":"b","c":"d"} JSON格式上传，可以传送JSON结构的数据 
 *                  ctFetch根据transferType值，会自动设置请求对象headers中的Content-Type
 *                  
 *         拦截：
 *             不管是请求拦截 还是响应拦截，如果有一个拦截器返回false，那后续同类型(请求/响应)的拦截器都会终止执行。
 *             响应拦截如果返回false，除了后续拦截器不执行，还有其他影响，见下方 响应拦截。        
 *         请求拦截：
 *             在发起请求之前拦截。
 *             拦截器函数参数对象： {url, data} data是解析后的参数对象
 * 
 *         响应拦截：
 *             在响应到达后拦截，包括网络错误、json格式解析错误、超时以及 正常拦截。      
 *             在数据正常返回后，如果 响应拦截返回false，还会终止正常程序流程（业务正常的then），抛出错误，
 *             方便业务在拦截器里 终止后续 流程的进行。      
 *             拦截器函数参数对象： {url, data} data为正常的响应原始数据 或 出错对象err
 *         使用：
 *             ctFetch.interceptors.request.use(fn(config), context?)     
 *             ctFetch.interceptors.response.use(fn(config), context?)  
 *             
 *
 *         err错误对象说明：
 *             数据结构： {code, reason, data?}
 *                   data字段说明：
 *                   当正常请求获取数据被拦截器拦截返回false的情况下，返回的数据存在data字段。
 *                   其他情况，没有data字段
 *         无论数据正确还是各种错误（除了拦截器错误外），都可以通过 响应拦截器拦截捕捉到。
 *         拦截器本身返回false引发的错误，拦截器本身是捕捉不到，需要业务根据场景是否需要去捕获该类错误。          
 * 
 *
 *         全局配置/ctFetch第二个配置字段说明：
 *         data字段说明：
 *             类型：可以是字符串 或 对象。
 *             不论是GET还是POST都可以通过data表示要发送的数据，ctFetch会根据情况格式化data。
 *               
 *         cache 字段说明：
 *             设置cache为true，则会以请求的url为key,缓存第一次响应结果。
 *             后续同样的url请求，则会从缓存取结果。  
 *             作为缓存的url key，是去除了_t随机参数的url  
 *             备注： 根据cache原理，post由于数据放在body中，请求url一般是后台接口（没带参数）。
 *                  同一接口的POST请求，参数可能根据场景不一样，故POST请求 一般不适合 开启cache。
 *
 *         timeout 字段说明：
 *              用于设置请求多少秒超时
 *
 *                  
 */

// require('es6-promise').polyfill();
// Vue cli3打包默认已经加了promise的垫片，所以es6-promise的垫片则不需要
import 'isomorphic-fetch';
import Cache from './cache.js';
import Config from './config.js';
import Err from './err.js';
import Helper from './helper.js';
import Interceptors from './interceptors.js';




function ctFetch(url, configOptions = {}) {

 

   // 整合全局配置，局部配置
   const options = Object.assign( {}, Config.getGlobalConfig() , configOptions );
   //超时，响应成功标识，是否开启缓存
   const { timeout, codeok, cache: cacheEnabled } = options;

   let _opts = Object.assign({}, options);
   // 处理请求参数
   let processOpts = Helper.processOpts({url, _opts});
   _opts = processOpts._opts;
   url = processOpts.url;


   //开启了缓存
   if( cacheEnabled ){
      const _data = Cache[ Helper.stripRandomT(url) ]; 
      // 且有数据，直接返回
      if(_data){
        return Promise.resolve(_data);  
      }
   }
   

   // 执行request拦截器
   const requestMeta = {
        url,
        data: Helper.getUrlParamsObject(url)
   }
   Interceptors.excuteRequestInterceptors(requestMeta);
   // 是否已经执行了 响应拦截器
   let hasExecuteResponseMiddleware = false; 

   return new Promise((resolve, reject) => {
                          
              // 设置超时监听定时器
               const timer = setTimeout(() => {
                   url = Helper.stripRandomT( url );
                   const errInfo = Err['timeout'];
                   errInfo.reason += `${timeout}秒`;
                   reject(errInfo);
               }, timeout * 1e3);

               
               url = Helper.appendRandomT(url);
               // 参数干净化
               _opts = Helper.cleanOpts(_opts);
               //开始fetch请求
               fetch(url, _opts).then(data => {
                                     url = Helper.stripRandomT( url );
                                     clearTimeout(timer)
                                     resolve(data)
                                  })
                                  .catch(err => {
                                     url = Helper.stripRandomT( url );
                                     clearTimeout(timer)
                                     reject(Err['err'])
                                  });

          }).then(response => {
              if (response.ok) {
                  return response.json()
                                  // 返回码不正确或者拦截器返回false，都要改变执行流程，抛出错误
                                 .then(v => {
                                    // 返回码不是codeok的情形
                                    if (v.code !== codeok) {
                                         const errInfo = Object.assign({}, Err['codeok'], {data: v});
                                         return Promise.reject(errInfo);
                                    }
                                    //在正常返回的情况下： 拦截器返回false，停止后续执行，抛出该类错误
                                    const processing = Interceptors.excuteResponseMiddleware(url, v);
                                    hasExecuteResponseMiddleware = true;
                                    if(!processing){
                                        const errInfo = Object.assign({}, Err['interceptor'], {data: v});
                                        return Promise.reject(errInfo);
                                    }
                                    return v;
                                 })
                                 .catch(err => {
                                    // 遇到了要抛出错误的情形： 返回码不正确 或 终止执行的拦截器
                                    // TODO：这里注意babel能否正确打包出兼容ie的垫片
                                    const throwOutSet = new Set(['err_interceptor', 'err_codeok']);
                                    if(err && throwOutSet.has(err.code) ){
                                        return Promise.reject(err);
                                    }
                                    // json数据解析异常处理
                                    return Promise.reject(Err['json']); 
                                 })
                  
              // 服务器异常处理，比如4XX 5XX
              // 有些异常能走到这，有些直接跑到最外层的catch里去了（不会进到这）
              } else {
                  const errInfo = Object.assign({}, Err['svr'], {reason: `网络异常${response.status}`});
                  return Promise.reject(errInfo);
              }
          }).then(v => {
                 //正常返回数据   
                 const data = v.data || v;
                 // 开启了缓存的情况
                 if( cacheEnabled ){
                    Cache[ url ] = data;
                 }
                 return  data;
          })
          .catch(err => {
                if(!hasExecuteResponseMiddleware){
                    Interceptors.excuteResponseMiddleware(url, err);
                }
               // 打印错误日志
               console.log(`Fetch Err: [url: ${url}] [err:`, err ,']');
               return Promise.reject(err);
          })
}

ctFetch.config = Config.config;
ctFetch.interceptors = Interceptors;


export default ctFetch;