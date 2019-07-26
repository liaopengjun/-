import {Base} from '../../utils/base.js';

class Category extends Base{

    /**
     * 构造
     */
   constructor(){
      super();//重载父类构造函数
   }

   /**
    *  获取所有栏目分类
    */

    getCategoryType(callback) {
        var params = {

            url: '/category/all',
            sCollback:function (res){
                callback && callback(res);
            }

        }
        this.request(params);
   }

   //获取指定分类
   getProductByCategory(id,callback){
        var params = {
            url: '/product/by_category?id='+id,
            sCollback:function (res){
                callback && callback(res);
            }
        }
        this.request(params);
   }
    
}

/*输出类*/
export {Category};