/**
 * ctFetch的工具函数模块
 */

import Util from './../util/util.js';
const {appendQuery, getUrlParamsObject, serializeObj, fastCopy} = Util;

const Helper = {
    appendQuery, 
    getUrlParamsObject, 
    serializeObj, 
    fastCopy,
    // 处理请求参数
    processOpts({url, _opts}){
        // 不为空字符串 也不为false，则说明需要加前缀
        if(_opts.prefix !== '' && _opts.prefix !== false){
            // 加上前缀
            url = '/' + _opts.prefix + url;
            // 修复有多个/的
            url = url.replace(/(\/){2,}/g, '/')
        } 
        if( _opts.method === 'GET' ){
             url = appendQuery(url, _opts.data)
         // 处理常用的post请求
        }else if( _opts.method === 'POST' ){
             // 处理Content-Type
             _opts.headers['Content-Type'] = _opts.headers['Content-Type'] || self.getContentType( _opts.transferType );
            // 获取格式化后的data
            _opts.body =  self.getFormatedData(_opts.body, _opts.transferType); 
        }
        return { url, _opts}; 
    },
    // 参数干净化，去掉没用的参数
    cleanOpts(opts){
        const {cache, prefix, transferType, data, timeout, codeok, ...options} = opts;
        return options;
    },
    // 获取正确的content-type
    getContentType(transferType){
        const typeMap = {
            form: 'multipart/form-data',
            url: 'application/x-www-form-urlencoded',
            json: 'text/plain'
        }
        return typeMap[transferType];
    },
    // 获取格式化后的数据
    getFormatedData(data, transferType){
        if(!data){
            return '';
        }
        if(typeof data === 'string'){
            return data;
        }
        const fnMap = {
            form(){
                const formData = new FormData;
                Object.keys( data ).forEach( key => formData.append(key, data[key]))
                return formData;
            },
            url(){
                return serializeObj(data);
            },
            json: () => window.JSON.stringify(data) 
        }
        return fnMap[transferType]();
       
    },
    // 去掉随机参数_t
    stripRandomT(url){
      return url.replace(/\b_t=[^&]*&?/, '').replace(/(&|\?)$/, '');
    },

    appendRandomT(url){
      if(/(&|\?)_t=[^&]*/.test(url)){
          return url;
      }else{
        return appendQuery(url, `_t=${Date.now()}`)
      }
    }
};
const self = Helper;

export default Helper;
