/* 
* ctFetch错误模块
* 数据结构： {code, reason, data?}
* data字段说明：
* 当正常请求获取数据被拦截器拦截返回false的情况下，返回的数据存在data字段。
* 其他情况，没有data字段
*/
export default {
	//一般的请求错误
	err: {code: 'err', reason: '网络异常err'},
	// 请求超时
	timeout: {code: 'err_timeout', reason: '请求超时'},
	// json格式解析错误
	json: {code: 'err_json', reason: 'json格式错误'},
	// 服务器异常，如4XX 5XX
	svr:{code: 'err_svr', reason: ''},
	// 拦截器提前返回
	interceptor: {code: 'err_interceptor', reason: '响应拦截器提前终止流程返回'},
	// 返回码错误
	codeok: {code: 'err_codeok', reason: '后台返回的状态码code错误'}
}