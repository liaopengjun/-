import { Theme } from './theme-model.js';
var theme = new Theme();
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

    var id = options.id;
    var name = options.name;

    this.data.id = id;
    this.data.name = name;

    this._loadDate();


  },

  //设置标题
  onReady:function(name){

    wx.setNavigationBarTitle({
      title: this.data.name,
    })
  },

  _loadDate: function () { 

    //专题列表
    theme.getProductsDate(this.data.id,(data)=>{
      console.log(data); 
      this.setData({
        themeInfo:data,
      })
    });
    
  },
  //商品详情
  onProductsItemTap: function (event) {
    //获取绑定id
    var id = theme.getDateSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },

})