import {Category} from './category-model.js';
var category = new Category();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr:['tanslate0','tanslate1','tanslate2','tanslate3','tanslate4','tanslate5'],
    currentMenuIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this._loadDate();
  },

  _loadDate:function(){

      category.getCategoryType((categoryDate)=>{

          //绑定分类栏目
          this.setData({
            categoryTypeArr:categoryDate,
          });

          //分类下的产品
        category.getProductByCategory(categoryDate[0].id,(data)=>{
            var dataobj = {
              procucts:data,
              topImgUrl:categoryDate[0].img.url,
              title:categoryDate[0].name,
            };

            this.setData({
              categoryInfo0:dataobj,
            });

          });

      }); 

      
  },
  //分类切换
  changeCategory:function(event){

      var index = category.getDateSet(event,'index');
      var id = category.getDateSet(event,'id');

      this.setData({
        currentMenuIndex:index,
      });

      //如果数据是否第一次请求
      if(!this.isLoadedData(index)) {
        var that=this;
        category.getProductByCategory(id, (data)=> {
          var data = that.getDataObjForBind(index,data);
           that.setData(data);
        });
      }
  },

  isLoadedData:function(index){
    if(this.data['categoryInfo'+index]){
      return true;
    }
    return false;
  },

  getDataObjForBind:function(index,data){
    var obj={},
        arr=[0,1,2,3,4,5],
        baseData=this.data.categoryTypeArr[index];
        
    for(var item in arr){
      if(item==arr[index]) {
        obj['categoryInfo' + item]={
          procucts:data,
          topImgUrl:baseData.img.url,
          title:baseData.name
        };
        return obj;
      }
    
    }
  },

  /*跳转到商品详情*/
  onProductsItemTap:function(event){
    //获取绑定id
    var id= category.getDateSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id,
    }) 
  },

})