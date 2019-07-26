
import { Product } from './product-model.js';
import { Cart } from '../cart/cart-model.js';
var product = new Product();
var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    countsArray:[1,2,3,4,5,6],
    productCount:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    this._loadDate();

  },

  _loadDate: function () {

    //商品详情页
    product.getDetailInfo(this.data.id, (data) => {
      this.setData({
        cartTotalCounts: cart.cartTotalCounts(),
        product: data
      })
    });

  },

  //商品数量
  bindPickerChange:function(event){
    var index = event.detail.value;
    var selectCount = this.data.countsArray[index];
    this.setData({
      productCount:selectCount,
    });
  },

  //选项卡
  onTabsItemTap:function(event){
    var index = product.getDateSet(event,'index');
    this.setData({
      currentTabsIndex:index
    })

  },

  //加入购物车
  onAddingToCartTap:function(event){
      this.addCart();

      //实时购物车数量
      this.data.cartTotalCounts += this.data.productCount;

      this.setData({
        cartTotalCounts:cart.cartTotalCounts(),
      });
      
  },

  //构建加入购物车的参数并且写入缓存
  addCart:function(){
    var tempObj = {};
    var keys = ['id','name','main_img_url','price'];
    //取出商品所有的键
    for(var key in this.data.product){

      // 验证是否存在
      if(keys.indexOf(key)>=0){
          tempObj[key]=this.data.product[key];//将对应键值写入json对象中
      }
      
    }
    cart.add(tempObj,this.data.productCount);//写入缓存
  },

  //跳转到购物车
  onCartTap:function(event){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})