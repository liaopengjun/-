import { Config } from "../utils/config.js";
import { Token } from 'token.js';

class Base{

    constructor(){
        this.BaseRequestUrl = Config.restUrl;
    }

    /**
     * Request 通用请求方法 (监听401)
     */
    
    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params, noRefetch) {
        var that = this,
            url=this.BaseRequestUrl + params.url;
        if(!params.type){
            params.type='get';
        }
        wx.request({
            url: url,
            data: params.data,
            method:params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: function (res) {
                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.statusCode.toString();
            
                var startChar = code.charAt(0);
                if (startChar == '2') {
                    params.sCollback && params.sCollback(res.data);
                } else {
                    if (code == '401') {
                        if (!noRefetch) {
                            that._refetch(params);
                        }
                    }

                    if(noRefetch){

                        that._processError(res);
                        params.eCallback && params.eCallback(res.data);
                        
                    }
                }
            },
            fail: function (err) {
                that._processError(err);
            }
        });
    }
    _processError(err){
        console.log(err);
    }
     //重新获取令牌
     _refetch(param) {
        var token = new Token();

        token.getTokenFromServer((token) => {
            this.request(param, true);
        });

    }

     //获取元素绑定的值
    getDateSet(event,key){
       return event.currentTarget.dataset[key];
    }
}
export {Base};