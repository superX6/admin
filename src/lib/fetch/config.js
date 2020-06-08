/**
 * ctFetch的全局配置模块
 */
const globalConfig = {
    cache: false,
    credentials: 'include',
    // 请求路径前缀
    prefix: '',
    method: 'GET',
    headers: {},
    // form url json
    transferType: 'url',
    // 要传输的数据
    data: null,
    // 默认20秒超时(单位：秒)
    timeout: 20,
    // 响应成功标志
    codeok: 'core.ok'
};


const Config = {
    data:null,
    getGlobalConfig(){
        return self.data || globalConfig;
    },
    // 配置参数
    config(cfg = {}){
        if(typeof cfg !== 'object'){
            console.error('ctFetch.config()的参数必须为Object类型');
            return;
        }
        self.data = Object.assign({} , globalConfig ,cfg)
    }
}
const self = Config;
export default Config;