import { Config } from './config.js';

class Token {

    constructor() {
        this.verifyUrl = Config.restUrl + 'token/verify';
        this.tokenUrl = Config.restUrl + 'token/user';
    }

    //令牌生成 || 校验
    verify(){
      
        var Token = wx.getStorageSync('token');
        if(!Token){
            this.getTokenFromServer();
        }else{
            this._veirfyFromServer(Token);          
        }
    }

    //从服务器获取token 写入缓存
    getTokenFromServer(callBack) {
        var that  = this;
        wx.login({
            success: function (res) {
                wx.request({
                    url: that.tokenUrl,
                    method:'POST',
                    data:{
                        code:res.code
                    },
                    success:function(res){
                        console.log(res)
                        wx.setStorageSync('token', res.data.token);//写入缓存
                        callBack&&callBack(res.data.token);
                    }
                })
            }
        })
    }



    //校验令牌是否过期 
    _veirfyFromServer(token){
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
                
                var valid = res.data.isValid;
                if(!valid){
                    that.getTokenFromServer();
                }
            }
        })
    } 

}
export { Token };