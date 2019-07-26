import {Address} from '../../utils/address.js';
import {Order} from '../order/order-model.js';
import {My} from '../my/my-model.js';

var address=new Address();
var order=new Order();
var my=new My();

Page({
    data: {
        userInfoStatus:null,
        pageIndex:1,
        orderArr :[],
        isLoadedAll:null
    },
    onLoad:function(){
        this._loadData();
        this._getAddressInfo();
    },
    onShow:function(){

        var newOrderFlag = order.hasNewOrder();
        if(newOrderFlag){
            this._refresh();
        }
    },
    _refresh:function(){
        var that = this;
        that.data.orderArr = [];
        this._getOrderInfo((res)=>{
            that.data.isLoadedAll=null;
            that.data.pageIndex= 1;
            order.execSetStorageSync(false);
        })
    },
    _loadData:function(){
        this._getOrderInfo();
    },  
    //收货地址
    _getAddressInfo:function(){
        address.getAddressInfo((res)=>{
            this._bindAddressInfo(res);
        });
    },
    //历史订单
    _getOrderInfo:function(cablock){
        var that = this;

        order.getOrders(this.data.pageIndex,(res)=>{
            var data =res.data.data;

            if(data){
                if(data.length>0){
                    that.data.orderArr.push.apply(that.data.orderArr,data);  //数组合并
                    this.setData({
                        orderArr: that.data.orderArr,
                    });
                }else{
                    that.data.isLoadedAll = true;
                }
            }
            cablock && cablock();
            
        });
    },
    getUserInfo: function() {
        var that = this;
        wx.getUserInfo({
            success: function (res) {
                var userInfo = {
                    nickName :res.userInfo.nickName,
                    avatarUrl:res.userInfo.avatarUrl,
                };
            
                that.setData({
                    userInfo:userInfo,
                    userInfoStatus:1
                })
                
            },
            fail:function(res){
                var userInfo = {
                    nickName :'军哥666',
                    avatarUrl:'../../imgs/icon/user@default.png',
                };
                that.setData({
                    userInfo:userInfo,
                    userInfoStatus:1
                })
            }
        });
    },
     //绑定地址
     _bindAddressInfo:function(addressInfo){
        this.setData({
            addressInfo:addressInfo,
        })
    },
    /*下拉刷新页面*/
    onReachBottom:function(){
        if(!this.data.isLoadedAll) {
            this.data.pageIndex++;
            this._getOrderInfo();
        }
    },

    /*显示订单的具体信息*/
    showOrderDetailInfo:function(event){
        var id=order.getDateSet(event,'id');
        wx.navigateTo({
            url:'../order/order?from=order&id='+id
        });
    },
    //订单重新支付
    rePay:function(event){
        var id=order.getDateSet(event,'id');
        var index=order.getDateSet(event,'index');
        this._execPay(id,index)
    },
    _execPay:function(id,index){
        var that=this;
        order.execPay(id,(statusCode)=>{
            // if(statusCode>0){
                var flag=statusCode==2;

                //更新订单显示状态
                // if(flag){
                //     that.data.orderArr[index].status=2;
                //     that.setData({
                //         orderArr: that.data.orderArr
                //     });
                // }
                
                //跳转到 成功页面
                wx.navigateTo({
                    url: '../pay-result/pay-result?id='+id+'&flag='+flag+'&from=my'
                });

            // }else{
            //     that.showTips('支付失败','商品已下架或库存不足');
            // }
        });
    },
      /*
    * 提示窗口
    * params:
    * title - {string}标题
    * content - {string}内容
    * flag - {bool}是否跳转到 "我的页面"
    */
  showTips:function(title,content,flag){
    wx.showModal({
        title: title,
        content: content,
        showCancel:false,
        success: function(res) {
            if(flag) {
                wx.switchTab({
                    url: '/pages/my/my'
                });
            }
        }
    });
  },


})