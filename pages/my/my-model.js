
import {Base} from '../../utils/base.js'

class My extends Base{
    constructor(){
        super();
    }

    //得到用户信息
    // getUserInfo(cb){
    //     var that=this;
    //     wx.login({
    //         success: function () {
    //             wx.getUserInfo({
    //                 success: function (res) {
    //                     typeof cb == "function" && cb(res.userInfo);
    //                 },
    //                 fail:function(res){
    //                     console.log(res)
    //                     typeof cb == "function" && cb({
    //                         avatarUrl:'../../imgs/icon/user@default.png',
    //                         nickName:'零食小贩'
    //                     });
    //                 }
    //             });
    //         },

    //     })
    // }

    /*更新用户信息到服务器*/
    _updateUserInfo(res){
        var nickName=res.nickName;
        delete res.avatarUrl;  //将昵称去除
        delete res.nickName;  //将昵称去除
        var allParams = {
            url: 'user/wx_info',
            data:{nickname:nickName,extend:JSON.stringify(res)},
            type:'post',
            sCallback: function (data) {
            }
        };
        this.request(allParams);

    }
}



export {My}