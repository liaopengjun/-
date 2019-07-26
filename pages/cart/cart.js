import { Cart } from "./cart-model";
var cart = new Cart();
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
  },

  onShow: function (options) {

      var cartData = cart.getCartDateFromLocal();//获取购物车里面商品
      // var countsInfo = cart.cartTotalCounts(true);获取选中的商品数量
      var cal = this._calcTotalAccountAndCounts(cartData);//总价,总数量

      this.setData({

        cartData:cartData,//商品
        account:cal.account,//价格
        selectedCounts:cal.selectedCounts,//选中数量
        selectedTypeCounts :cal.selectedTypeCounts//类型

      });

  },

  //保存
  onHide:function(){
    cart.execsetStorageSync(this.data.cartData);

  },
  // 计算商品总价格和总数量
  _calcTotalAccountAndCounts:function(data){
      var len = data.length;

      //选中的总价格
      var account = 0;

      //选中购买商品的总数
      var selectedCounts = 0;

      //选中购买商品种类个数
      var selectedTypeCounts = 0;

      let multiple =100;

      for(let i=0;i<len;i++){

        //计算选中商品价格和数量(selectStatus必须是选中状态才能计算价格)
        if(data[i].selectStatus){

          account += data[i].price * multiple * Number(data[i].counts) * multiple;
          selectedCounts += data[i].counts;
          selectedTypeCounts++;


        }
      }
      return {
        account:account / (multiple * multiple),
        selectedCounts : selectedCounts,
        selectedTypeCounts : selectedTypeCounts
      }

  },

  //单选
  toggleSelect:function(event){

    var id = cart.getDateSet(event,'id');
    var status = cart.getDateSet(event,'status');
    var index = this._getProductIndexById(id);
    this.data.cartData[index].selectStatus = ! status;//改变勾选状态
    this._resetCartData();//重新刷新价格

    

  },

  //全选
  toggleSelectAll:function(event){
    
    var status=cart.getDateSet(event,'status')=='true';
    var data=this.data.cartData;
    var  len=data.length;
    for(let i=0;i<len;i++) {
        data[i].selectStatus=!status;
    }
    this._resetCartData();


  },
  //加减购物车
  changeCounts:function(event){

    var id = cart.getDateSet(event,'id');
    var type = cart.getDateSet(event,'type');

    var counts = 1;
    var index = this._getProductIndexById(id);

    if(type == 'add'){

      cart.addCount(id);

    }else{

      counts = -1;
      cart.cutCount(id);

    }
    this.data.cartData[index].counts += counts;
    this._resetCartData();

  },
  //删除商品
  delete:function(event){

    var id = cart.getDateSet(event,'id');
    var index = this._getProductIndexById(id);

    this.data.cartData.splice(index,1);
    this._resetCartData();
    cart.delete(id);//删除缓存



  },
  //获取商品下标
  _getProductIndexById:function(id){

      var data = this.data.cartData;
      var len  = data.length;
      for(let i = 0; i < len; i++ ){
          if(data[i].id == id){
            return i;
          }
      }

  },

  //重新计算商品数量金额
  _resetCartData:function(){
      var newData = this._calcTotalAccountAndCounts(this.data.cartData);
      this.setData({

        cartData:this.data.cartData,//商品
        account:newData.account,//价格
        selectedCounts:newData.selectedCounts,//选中数量
        selectedTypeCounts :newData.selectedTypeCounts//类型

      });
  },

  //下单
  submitOrder:function(event){
    wx.navigateTo({
      url: '../order/order?account=' + this.data.account+'&from=cart',
    })  
  }





})