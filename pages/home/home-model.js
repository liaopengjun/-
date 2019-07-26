import {Base} from '../../utils/base.js';
class Home extends Base{

    /**
     * 构造
     */
   constructor(){
      super();//重载父类构造函数
   }

   /**
    * 获取banner 
    * id 专题
    */
    getBannerDate(id,callback){
      var params = {
          url: 'banner/'+id,
          sCollback:function (res){
            callback && callback(res.items);
          }
      }
      this.request(params);
    
    }
    /**
     * 获取精选主题
     *
     */
    getThemeDate(callback){

      var params = {
        url: 'theme?ids=1,2,3',
        sCollback:function (res){
          callback && callback(res);
        }
      }

      this.request(params);

    }

    /**
     * 获取新品商品
     *
     */
    getProductsDate(callback){
      var params = {
        url: 'product/recent',
        sCollback:function (res){
          callback && callback(res);
        }
      }

      this.request(params);

    }
    
}
/*输出类*/
export {Home};