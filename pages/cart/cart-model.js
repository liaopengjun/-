import { Base } from '../../utils/base.js';

class Cart extends Base {

  /**
   * 构造
   */
  constructor() {
    super();//重载父类构造函数
    this._storageKeyName = 'cart';
  }

    /*
    * 加入到购物车
    * 如果之前没有样的商品，则直接添加一条新的记录， 数量为 counts
    * 如果有，则只将相应数量 + counts
    * @params:
    * item - {obj} 商品对象,
    * counts - {int} 商品数目,
    * */

    add(item,counts){
     
      var cartDate = this.getCartDateFromLocal();
      var isHasOneinfo = this._isHasThatOne(item.id,cartDate);
      //是否初次添加购物车
      if(isHasOneinfo.index == -1){
        item.counts=counts;
        item.selectStatus=true;  //默认在购物车中为选中状态
        cartDate.push(item);
      }else{
          cartDate[isHasOneinfo.index].counts += counts;
      }
      wx.setStorageSync(this._storageKeyName,cartDate);//写入缓存

    }

    //获取购物车里面所有商品
    cartTotalCounts(flag){
        var data = this.getCartDateFromLocal();
        var counts=0;
        for(let i=0;i<data.length;i++){
            if(flag){
              if(data[i].selectStatus){
                counts += data[i].counts;  
              }
            }else{
                counts += data[i].counts;  
            }
        }
        return counts;

    }

    //获取缓存里面的数据
    getCartDateFromLocal(flag){

      var res = wx.getStorageSync(this._storageKeyName);//读取缓存

      if(!res){
        return [];
      }

      //下单时过滤掉未选中的商品
      if(flag){
        var newArr =[];
        for(let i=0;i<res.length;i++){
          if(flag){
            if(res[i].selectStatus){
              newArr.push(res[i]);
            }
          }
        }
        res = newArr;

      }
      return res;

    }

    //验证是否已经添加购物车商品并返回缓存数据
    _isHasThatOne(id, arr) {
      
      var item;
      var result = { index: -1 };
      for (let i = 0; i < arr.length; i++) {
        item = arr[i];
        if (item.id == id) {
          result = {
            index: i,
            data: item
          };
          break;
        }
      }
      return result;

    }

    //修改商品数目
    _changCounts(id,counts){

      var cartDate = this.getCartDateFromLocal();
      var hasInfo = this._isHasThatOne(id,counts);
      
      if(hasInfo.index != -1){
          if(hasInfo.data.counts > 1){
            cartDate[hasInfo.index].counts +=counts;
          }
      }

      wx.setStorageSync(this._storageKeyName,cartDate);//更新本地缓存
    };

    //保存缓存
  execsetStorageSync(cartDate){
    wx.setStorageSync(this._storageKeyName, cartDate);//更新本地缓存
  }

    //增加数目
    addCount(id){
      this._changCounts(id,1);
    }

    //减少数目
    cutCount(id){
      this._changCounts(id,-1);
    }

    delete(ids){
      //判断是否多条数据
      if(!(ids instanceof Array)){
        ids = [ids];
      }
      var cartDate = this.getCartDateFromLocal();

      for(let i=0;i<ids.length;i++){
          var hasInfo = this._isHasThatOne(ids,cartDate);
          if(hasInfo.index != -1){
                cartDate.splice(hasInfo.index,1);//删除某一项
          }
      }
      wx.setStorageSync(this._storageKeyName,cartDate);//更新本地缓存


    }



}

/*输出类*/
export { Cart };