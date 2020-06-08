/**
 * ctFetch的拦截器模块
 */
const Interceptors = {
    req: [],
    resp: [],
    request: {
        use:(...args) => self.use('req', ...args)
    },
    response: {
        use:(...args) => self.use('resp', ...args)
    },
    use(state, fn, context){
        self[state].push( {fn, context})
    },
    excuteRequestInterceptors(meta){ 
        return self.excuteInterceptors('req', meta) ;
    }, 
    excuteResponseMiddleware(url, data){
        // 执行response拦截器
        const meta = {
           url,
           // 传递原始数据到业务
           data
        }
        return self.excuteInterceptors('resp', meta);
    },
    // 执行拦截器:拦截当前的url
    // request阶段，data为参数对象；response阶段，data依靠外部传递过来
    excuteInterceptors(state, meta){
        const interceptors = self[state];
        for(let i = 0, l = interceptors.length; i < l; i++){
            const {fn, context} = interceptors[i];
            const result = context ? fn.call(context, meta) : fn(meta);
            if(result === false){
                return false;
            }
            
        }
        return true;
    }
    
}
const self = Interceptors;
export default Interceptors;