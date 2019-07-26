import {Home} from './home-model.js';
var home = new Home();
Page({
  /**
   * 页面的初始数据
   */
  data: {


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this._loadDate();
  },

  _loadDate:function(){
    //获取banner

    var id = 1;
    home.getBannerDate(id,(res)=> {
      console.log('banner');
      console.log(res);
        this.setData({
          'bannerArr':res,
        });
    });

    //获取主题
    home.getThemeDate((res)=> {
      console.log('item');
      console.log(res);
      this.setData({
        'themeArr':res,
      });
    });

    //商品列表
    home.getProductsDate((res)=> {
      console.log('product');
      console.log(res);
      this.setData({
        'productsArr':res,
      });
    });

  },


  //轮播跳转(新品)
  onProductsItemTap:function(event){
    //获取绑定id
    var id= home.getDateSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id,
    }) 
  },

  //精选主题跳转
  onThemeItemTap:function(event){
    var name= home.getDateSet(event,'name');
    var id= home.getDateSet(event,'id');
    wx.navigateTo({
      url: '../theme/theme?id='+id+'&name='+name,
    }) 
  },


})  