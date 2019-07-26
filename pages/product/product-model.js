import { Base } from '../../utils/base.js';
class Product extends Base {

  constructor() {
    super();//重载父类构造函数
  }


  /**
   * 获取新品商品
   *
   */

  getDetailInfo(id, callback) {
    var params = {
      url: 'product/' + id,
      sCollback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}
/*输出类*/
export { Product };